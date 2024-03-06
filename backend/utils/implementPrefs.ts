import getCurrentUser from "./getCurrentUser";

const implementPrefs = async (row: any) => {
    const name = row?.email.split('@')[0] as string

    const user = await getCurrentUser()

    let prefsFile = Bun.file(`/home/${user}/accounts/${name}/prefs`);
    let prefsText = await prefsFile.text()

    const loginHashBaseString = `<pref name="login.hash" type="string"></pref>`
    const loginHashFilled = `<pref name="login.hash" type="string">${row.emailHash}</pref>`

    let replacedStrings = prefsText.replaceAll(loginHashBaseString, loginHashFilled)

    await Bun.write(`/home/${user}/accounts/${name}/prefs`, replacedStrings)
}

export default implementPrefs