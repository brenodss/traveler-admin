import { Base64 } from "js-base64"


const handleFormatTable = (csvData: any, defaultValues: any) => {
    const tableToFormat = [...csvData]
    const formatedTable = tableToFormat.map((item) => {
        return {
            ...item,
            vpnEnabled: defaultValues.vpnEnabled,
            Imap: defaultValues.imap,
            emailHash: Base64.encode(item.email),
            status: 'Unregistered'
        }
    })

    return formatedTable
}

export default handleFormatTable