import { useQuery } from "@tanstack/react-query";

const handleComposes = async (state: string, account: string) => {
    try {
        return await fetch('http://192.168.0.42:5678/webhook/toggleAccount', {
            referrerPolicy: "unsafe-url",
            method: "POST",
            headers: {
                "Authorization": "Basic YnJlbm9jYToxMzU0",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                account,
                action: state === 'on' ? 'docker compose up -d' : 'docker compose down'
            })
        }).then((response) => response.json())
    }
    catch (error) {
        alert(error)
    }

}

const createAccount = async (email: string, password: string, setCsvData: any, index: number) => {
    try {
        const response = await fetch('http://192.168.0.42:5678/webhook/createAccount', {
            method: "POST",
            headers: {
                "Authorization": "Basic YnJlbm9jYToxMzU0",
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })
        }) as any;
        const { message } = await response.json()
        console.log(index);

        if (message) {
            setCsvData((previous: any) => {

                return previous.map((account: any, i: number) => {
                    if (i === index) {
                        return {
                            ...account,
                            status: message
                        }
                    }
                    return account
                })
            })
        }

        if (response.status === 500) {
            setCsvData((previous: any) => {

                return previous.map((account: any, i: number) => {
                    if (i === index) {
                        return {
                            ...account,
                            status: 'Error 500'
                        }
                    }
                    return account
                })
            })
        }

    }
    catch (error) {
        alert(error)
    }

}
const verifyAndGetCode = async (email: string, password: string, setCsvData: any, index: number) => {
    try {
        setCsvData((previous: any) => {
            return previous.map((account: any, i: number) => {
                if (i === index) {
                    return {
                        ...account,
                        loading: "true"
                    }
                }
                return account
            })
        })

        const response = await fetch('http://192.168.0.42:5678/webhook/getEmails', {
            method: "POST",
            headers: {
                "Authorization": "Basic YnJlbm9jYToxMzU0",
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })
        }) as any;
        console.log(JSON.stringify(response));
        
        const message = await response.json()
        console.log(message);

        setCsvData((previous: any) => {

            return previous.map((account: any, i: number) => {
                if (i === index) {
                    return {
                        ...account,
                        loading: "false"
                    }
                }
                return account
            })
        })

        // if (message?.status === "Verified sucessfully") {
        //     setCsvData((previous: any) => {

        //         return previous.map((account: any, i: number) => {
        //             if (i === index) {
        //                 return {
        //                     ...account,
        //                     status: "Verified",
        //                     loading: "false"
        //                 }
        //             }
        //             return account
        //         })
        //     })
        // }

        // if (response.status === "Internal error") {
        //     setCsvData((previous: any) => {

        //         return previous.map((account: any, i: number) => {
        //             if (i === index) {
        //                 return {
        //                     ...account,
        //                     status: "Internal error",
        //                     loading: "false"
        //                 }
        //             }
        //             return account
        //         })
        //     })
        // }

        // if (response.status) {
        //     setCsvData((previous: any) => {

        //         return previous.map((account: any, i: number) => {
        //             if (i === index) {
        //                 return {
        //                     ...account,
        //                     status: response.status,
        //                     loading: "false"
        //                 }
        //             }
        //             return account
        //         })
        //     })
        // }
    }
    catch (error) {
        setCsvData((previous: any) => {

            return previous.map((account: any, i: number) => {
                if (i === index) {
                    return {
                        ...account,
                        loading: "false"
                    }
                }
                return account
            })
        })

        console.log(error);
        
    }

}

const getImapInfo = (email: string, password: string) => {
    const { isLoading, data, refetch, error } = useQuery({
        queryKey: ['containersRunning'],
        queryFn: () => fetch('localhost:3000/verifyAndGetCode', {
            method: "GET",
            body: JSON.stringify({email, password})
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
        queryFn: () => fetch('localhost:3000/generateFolders', {method: "POST"}).
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
        queryFn: () => fetch('localhost:3000/getInstances', {method: "GET"}).
        then((res) => {
            if(res) return res.json()
          }
    
          ),
      })
      return {isLoading, data, refetch, error}
}


export { generateFolders, getImapInfo, getInstances }
