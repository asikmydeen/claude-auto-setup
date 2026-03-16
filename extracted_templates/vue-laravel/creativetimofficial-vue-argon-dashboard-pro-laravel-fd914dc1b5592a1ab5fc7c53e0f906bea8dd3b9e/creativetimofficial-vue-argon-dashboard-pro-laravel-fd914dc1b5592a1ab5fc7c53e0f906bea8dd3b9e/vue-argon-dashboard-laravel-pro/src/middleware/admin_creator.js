import store from "../store";

export default async function admin_creator({ router }) {
  let role = await store.getters["profile/me"]?.roles[0].name;

  if (role != "admin" && role != "creator") {
    return router.push({ name: "Default" });
  }

}