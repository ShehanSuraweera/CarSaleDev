import { createSupabaseClient } from "../client";

function getStorage() {
  const { storage } = createSupabaseClient();
  return storage;
}
