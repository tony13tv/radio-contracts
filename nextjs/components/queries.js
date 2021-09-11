import {gql} from "@apollo/client";

export const LOGIN = gql`
    mutation Login($username: String!, $password: String!){
        login(input: { identifier: $username, password: $password }) {
            jwt
        }
    }
`

export const GET_AGENCIES = gql`
    query($start: Int! $search: String = null){
        count: customersConnection(start: $start limit: 10 where: {type: "Agency", _q: $search}) {
            aggregate {
                count
            }
        }
        total: customersConnection(where: {type: "Agency"}) {
            aggregate {
                count
            }
        }
        items: customers(start: $start, limit: 10, where: {type: "Agency", _q: $search}) {
            id name img {src: url} created_at
        }
        pagination {
            itemsPerPage
        }
    }
`

export const GET_BRANDS = gql`
    query GetBrands($start: Int!){
        count: customersConnection(start: $start limit: 10 where: {type: "Brand"}) {
            aggregate {
                count
            }
        }
        total: customersConnection(where: {type: "Brand"}) {
            aggregate {
                count
            }
        }
        items: customers(start: $start limit: 10 where: {type: "Brand"}) {
            id name img {src: url} created_at
        }
        pagination {
            itemsPerPage
        }
    }
`

export const GET_CUSTOMERS = gql`
    query GetCustomers($start: Int!){
        customersConnection {
            aggregate {
                count totalCount
            }
        }
        items: customers(start: $start, limit: 10) {
            id name img {src: url} created_at
        }
        pagination {
            itemsPerPage
        }
    }
`