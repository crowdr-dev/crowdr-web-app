import img from "../../assets/img.jpg";
import React, { useCallback } from "react";

const Profile = () => {
  const [image, setImage] = React.useState<string | null>(null);

  const onHandleImages = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    const file = e?.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  }, []);
