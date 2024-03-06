const handleCsvChange = (index: number, event: any, CsvData: any, setCsvData: any) => {
    
    const changedData = CsvData.map((account: any, i: number) => {
        if(i === index) {
            return {
                ...CsvData[index],
                email:  event.target.value,
            }
        }
        return account
    })
    
    
    setCsvData(changedData)
  }

export default handleCsvChange;