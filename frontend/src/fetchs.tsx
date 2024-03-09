import { useQuery } from "@tanstack/react-query";
import { Loading } from "./assets/Loading";

const handleContainers = (email: string, password: string, action: string) => {
    const { isLoading, data, refetch, error } = useQuery({
        queryKey: ['containersRunning'],
        queryFn: () => fetch('http://localhost:3000/handleContainer', {
            method: "POST",
            
            body: JSON.stringify({email, password, action})
        }).
        then((res) => {
            if(res) return res.json()
          }
    
          ),
      })
      return {isLoading, data, refetch, error}
}

const createAccount = (email: string, password: string) => {    
    const { isLoading, data, refetch, error } = useQuery({
        queryKey: ['createAccount', email, password],
        enabled: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        queryFn: () => fetch('http://localhost:3000/createAccount', {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json',
            },
        }).
        then((res) => {
            if(res) return res.json()
          }
    
          ),
      })

      return {isLoading, data, refetch, error}
}
const getImapInfo = (email: string, password: string, imapServer: string) => {
    const { isLoading, data, refetch, error } = useQuery({
        enabled: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        queryKey: ['Verify', email, password, imapServer],
        queryFn: () => fetch('http://localhost:3000/verifyAndGetCode', {
            method: "POST",
            body: JSON.stringify({email, password, imapServer}),
            headers: {
                'Content-Type': 'application/json',
            },
        }).
        then((res) => {
            if(res) return res.json()
          }
    
          ),
      })
      return {isLoading, data, refetch, error}
}

const generateFolders = () => {
    const { isLoading, data, refetch, error } = useQuery({
        queryKey: ['containersRunning'],
        queryFn: () => fetch('http://localhost:3000/generateFolders', {method: "POST"}).
        then((res) => {
            if(res) return res.json()
          }
    
          ),
      })
      return {isLoading, data, refetch, error}
}

const getInstances = () => {
    const { isLoading, data, refetch, error } = useQuery({
        queryKey: ['containersRunning'],
        queryFn: () => fetch('http://localhost:3000/getInstances', {method: "GET"}).
        then((res) => {
            if(res) return res.json()
          }
    
          ),
      })
      return {isLoading, data, refetch, error}
}


export { generateFolders, getImapInfo, getInstances, createAccount, handleContainers }
