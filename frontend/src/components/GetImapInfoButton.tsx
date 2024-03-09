import { Loading } from "@/assets/Loading"
import { getImapInfo } from "@/fetchs"
import { Button } from "flowbite-react"

const GetImapInfoButton = ({ email, password, row, setCsvData, imapServer, status }: any) => {    
    const { isLoading, refetch } = getImapInfo(email, password, imapServer);

    return <Button
        key={email}
        onClick={async () => {
            const { data, error, status } = await refetch()
            console.log(status);
            
            setCsvData((previous: any) => {
                return previous.map((item: any, index: number) => {
                    if (index === row.index) {
                        return {
                            ...item,
                            status: (data && !error) ? data.message.verifyResponse : "Internal Error"
                        }
                    }
                    return item;
                })
            })
            // data && alert(JSON.stringify(data))
        }}
        disabled={!email || !password}
        className="text-emerald-400 hover:border-emerald-400 w-full border border-[#ddd8]">
        {isLoading && <Loading />}
        Verify
    </Button>
}

export default GetImapInfoButton