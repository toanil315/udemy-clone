import { axiosClient } from "../util/Setting/axiosClient"
import { DOMAIN, TOKEN } from "../util/Setting/config";

export class BaseService {
    get = (url) => {
        return axiosClient({
            method: "GET",
            url: `${DOMAIN}/${url}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(TOKEN)
            }
        });
    }
    post = (url, data) => {
        return axiosClient({
            method: "POST",
            url: `${DOMAIN}/${url}`,
            data,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(TOKEN)
            }
        })
    }
}