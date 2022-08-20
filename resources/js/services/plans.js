import wAxios from "./wrapper";

const axios = wAxios("plans");

export async function load() {
    const { data } = await axios("load").get("/dashboard/plans");
    return data.plans;
}

export async function subscribe(plan_id, nonce) {
    const { data } = await axios("subscribe").post("/dashboard/payments/subscribe", {
        plan_id,
        nonce
    });

    return data;
}

export async function unsubscribe() {
    await axios("unsubscribe").post("/dashboard/payments/unsubscribe");
}

export async function getCurrentPlan() {
    const { data } = await axios("current").get("/dashboard/plans/current");

    return data;
}