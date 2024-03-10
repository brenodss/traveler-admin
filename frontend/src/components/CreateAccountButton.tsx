import { Loading } from "@/assets/Loading"
import { createAccount } from "@/fetchs"
import { Button } from "flowbite-react"

const CreateAccountButton = ({ email, password, status, row, setCsvData, table }: any) => {
    const { isLoading, refetch } = createAccount(email, password);
    
    return <Button
        key={email}
        onClick={async () => {


            const {data} = await refetch()

            setCsvData((previous: any) => {
                return previous.map((item: any, index: number) => {
                    if (index === row.index) {
                        return {
                            ...item,
                            status: data.message
                        }
                    }
                    return item;
                })
            })
        }}
        disabled={status !== 'Unregistered' || (!email || !password)}
        className="text-emerald-400 hover:border-emerald-400 w-full border border-[#ddd8]">
        {isLoading && <Loading />}
        Create
    </Button>
}

export default CreateAccountButton