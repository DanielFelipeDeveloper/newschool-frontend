import { http } from "~/services/http/config";
import utils from "~/utils/index";

export default {

  getToken: () => {
    return JSON.parse(localStorage.getItem('auth')).accessToken
  },

  getPasswordCredentials: () => {
    const base64 = btoa(
      `${process.env.credentials.name}:${process.env.credentials.secret}`,
    )
    return `Basic ${base64}`

  },
  getExternalCredentials: () => {
    const base64 = btoa(
      `${process.env.credentials.external.name}:${process.env.credentials.external.secret}`,
    )

    const clientCredentials = `Basic ${base64}`
    const body = utils.toFormData({ grant_type: 'client_credentials' })

    return http.post('oauth/token', body, {
      headers: { Authorization: clientCredentials },
    })
  },

  toFormData: (object) => {
    const form = new FormData()
    Object.keys(object).forEach(item => {
      form.append(item, object[item])
    })
    return form;
  }
}
