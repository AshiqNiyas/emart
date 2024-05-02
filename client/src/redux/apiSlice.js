import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/users",
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/products",
  }),
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getAllproducts: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
        credentials: "include",
      }),
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetProfileQuery,
} = usersApi;

export const {
  useAddProductMutation,
  useGetAllproductsQuery,
  useGetProductByIdQuery,
} = productsApi;
