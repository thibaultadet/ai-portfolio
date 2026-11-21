import createClient from "openapi-fetch";
import type { paths } from "#/lib/api/schema.gen";

export const api = createClient<paths>();
