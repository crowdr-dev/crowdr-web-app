import React, {
  createContext,
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
  ReactNode,
} from "react";
import { HeadlessService, IMessage } from "@novu/headless";
import { useUser } from "./useUser";


interface NotificationContextType {
  notifications: IMessage[];
  markNotificationsAsRead: (messageIds: string | string[]) => void;
  markAllMessagesAsRead: (feedId?: string) => void;
  markAllMessagesAsSeen: (feedId?: string) => void;
  pageNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  fetchNotifications: () => void;
  unseenCount: number
}

const NotificationContext = createContext<NotificationContextType>(
  {} as NotificationContextType
);

type Props = {
  children: ReactNode;
};

const NotificationProvider: React.FC<Props> = ({ children }) => {
  const user = useUser();
  const [notifications, setNotifications] = useState<IMessage[]>([]);
  const headlessServiceRef = useRef<HeadlessService | null>(null);
  const [pageNum, setPageNum] = useState(0);
  const [unseenCount, setUnseenCount] = useState(0);

  const fetchNotifications = useCallback(() => {
    const headlessService = headlessServiceRef.current;
    if (headlessService) {
      headlessService.fetchNotifications({
        listener: ({ data, error, isError, isFetching, isLoading, status }) => {
          // Handle the state of the fetching process and errors here.
        },
        onSuccess: (response) => {
          // Handle the fetched notifications here.
          console.log(response, "data", 111);
          setNotifications(response.data); // Store notifications in the state
        },
        page: pageNum, // page number to be fetched
      });
    }
  }, [pageNum]);

  const getUnseenCount = useCallback(() => {
    const headlessService = headlessServiceRef.current;
    if (headlessService) {
      if (unseenCount === 0) {
        headlessService.fetchUnseenCount({
          listener: () => {},
          onSuccess: (data) => {
            console.log(data, "unseen count listener", 222);
            setUnseenCount(data.count);
          },
        });
      }

      headlessService.listenUnseenCountChange({
        listener: (unseenCount: number) => {
          console.log(unseenCount, "unseenCount");
          setUnseenCount(unseenCount);
          fetchNotifications();
        },
      });
    }
  }, []);

  useEffect(() => {
    if (user?._id) {
      const headlessService = new HeadlessService({
        applicationIdentifier: "JyjHr30y-vzW",
        subscriberId: user._id,
      });

      headlessService.initializeSession({
        listener: (res) => {},
        onSuccess: (session) => {
          headlessServiceRef.current = headlessService;
          fetchNotifications();
          getUnseenCount();
        },
        onError: (error) => {
          console.log("headlessService error:", error);
        },
      });
    }
  }, [fetchNotifications, getUnseenCount, user?._id]);

  // Function to mark notifications as read
  const markNotificationsAsRead = (messageIds: string | string[]) => {
    if (!Array.isArray(messageIds)) {
      messageIds = [messageIds];
    }

    const headlessService = headlessServiceRef.current;

    if (headlessService) {
      headlessService.markNotificationsAsRead({
        messageId: messageIds,
        listener: (result) => {},
        onError: (error) => {
          console.error("Error marking notifications as read:", error);
        },
      });
    }
  };

  const markAllMessagesAsRead = (feedId?: string) => {
    const headlessService = headlessServiceRef.current;

    if (headlessService) {
      headlessService.markAllMessagesAsRead({
        listener: (result) => {
          console.log(result);
          // Handle the result of marking all messages as read
          // You can update the state or perform other actions here
        },
        onError: (error) => {
          console.error("Error marking all messages as read:", error);
          // Implement error handling if needed
        },
        feedId: feedId, // Pass the feed ID here, it can be an array or a single ID
      });
    }
  };

  const markAllMessagesAsSeen = (feedId?: string) => {
    const headlessService = headlessServiceRef.current;

    if (headlessService) {
      headlessService.markAllMessagesAsSeen({
        listener: (result) => {
          console.log(result);
          // Handle the result of marking all messages as read
          // You can update the state or perform other actions here
        },
        onError: (error) => {
          console.error("Error marking all messages as seen:", error);
          // Implement error handling if needed
        },
        feedId: feedId, // Pass the feed ID here, it can be an array or a single ID
      });
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        markNotificationsAsRead,
        markAllMessagesAsRead,
        markAllMessagesAsSeen,
        pageNum,
        setPageNum,
        fetchNotifications,
        unseenCount
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

const useNotification = (): NotificationContextType =>
  useContext(NotificationContext);

export { useNotification, NotificationProvider };
