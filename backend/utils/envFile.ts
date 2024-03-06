const EnvFile = (port: string, accountName: string) => {
    return `PORT=${port}
TZ=UTC
SIZEW=1920
SIZEH=1080
REFRESH=60
DPI=96
CDEPTH=24
PASSWD=1354
WEBRTC_ENCODER=nvh264enc
BASIC_AUTH_PASSWORD=1354
ACCOUNT_NAME=${accountName}
NOVNC_ENABLE=true
OPENVPN_ENABLE=true`
}

export default EnvFile