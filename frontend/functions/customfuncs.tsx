// TODO: Non authenticated HTTP POST
export const postRequestWithoutHeaders = async (
    url: string,
    payload: object
): Promise<boolean> => {
    return fetch(url, payload).then(() => {
        return true
    })
}
