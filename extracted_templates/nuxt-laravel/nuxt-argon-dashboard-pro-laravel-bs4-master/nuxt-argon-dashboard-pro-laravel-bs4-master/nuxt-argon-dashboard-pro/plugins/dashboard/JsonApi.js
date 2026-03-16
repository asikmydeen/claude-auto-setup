// thanks to https://github.com/mrichar1/jsonapi-vuex/issues/13
export default function ({ $axios, store }) {
  $axios.setHeader("Content-Type", "application/vnd.api+json");
  $axios.setHeader("Accept", "application/vnd.api+json");
}
