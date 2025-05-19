"use client"
import { useQuery, useQueryClient } from "react-query"
import keys from "./keys"
import _my_campaigns from "../_my_campaigns"
import { useEffect, useState } from "react"
import _campaigns from "../_campaigns"
import { IGetCampaignsParams } from "../_campaigns/models/GetCampaigns"

const useCampaignsQuery = ({ params = {}, enableQuery = true }: Props = {}) => {
  const queryClient = useQueryClient()
  const queryKey = [keys.GET_CAMPAIGNS, { ...params }]
  const [data, setData] = useState<typeof query.data>()

  const query = useQuery({
    queryKey,
    queryFn: () => _campaigns.getCampaigns(params),
    refetchOnWindowFocus: false,
    enabled: enableQuery,
  })

  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (
        event &&
        event.query.queryKey[0] === queryKey[0] &&
        event.type === "queryUpdated"
      ) {
        setData(event.query.state.data)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [queryKey, queryClient])

  return { query, data }
}

export default useCampaignsQuery

interface Props {
  params?: IGetCampaignsParams
  enableQuery?: boolean
}
