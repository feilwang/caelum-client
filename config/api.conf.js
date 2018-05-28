/**
 * Created by Feil(admin@feil.wang) on 2018/5/28.
 */
const isPro = Object.is(process.env.NODE_ENV, 'production');

export default {
  baseUrl: isPro ? 'https://caelum.wfeil.com/' : '/'
}
