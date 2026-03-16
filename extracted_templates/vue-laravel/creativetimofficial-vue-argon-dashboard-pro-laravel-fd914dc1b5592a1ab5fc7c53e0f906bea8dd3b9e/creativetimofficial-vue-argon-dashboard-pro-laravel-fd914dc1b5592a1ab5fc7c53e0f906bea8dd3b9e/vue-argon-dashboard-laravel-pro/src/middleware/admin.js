import store from "../store";

export default async function admin({ router }) {
  let role = await store.getters["profile/me"]?.roles[0].name;

  if (role != "admin") {
    return router.push({ name: "Default" });
  }
  
}
