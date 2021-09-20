import {gql} from "@apollo/client";

export const LOGIN = gql`
    mutation ($username: String!, $password: String!){
        login(input: { identifier: $username, password: $password }) {
            user {
                email username name
                avatar {src: url formats}
                country {name}
                customers {id name}
            }
            jwt
        }
    }
`

export const GET_AGENCIES = gql`
    query($start: Int! $pagination: Int = 10 $search: String = null){
        count: customersConnection(start: $start limit: $pagination where: {type: "Agency", _q: $search}) {
            aggregate {
                count
            }
        }
        total: customersConnection(where: {type: "Agency"}) {
            aggregate {
                count
            }
        }
        items: customers(start: $start, limit: $pagination, where: {type: "Agency", _q: $search}) {
            id name avatar {src: url} created_at
        }
    }
`

export const GET_BRANDS = gql`
    query ($start: Int! $pagination: Int = 10 $search: String = null){
        count: customersConnection(start: $start limit: $pagination where: {type: "Brand", _q: $search}) {
            aggregate {
                count
            }
        }
        total: customersConnection(where: {type: "Brand"}) {
            aggregate {
                count
            }
        }
        items: customers(start: $start limit: $pagination where: {type: "Brand", _q: $search}) {
            id name avatar {src: url} created_at
        }
    }
`

export const GET_CUSTOMERS = gql`
    query ($start: Int! $pagination: Int = 10 $search: String = null){
        count: customersConnection(start: $start limit: $pagination where: {_q: $search}) {
            aggregate {
                count
            }
        }
        total: customersConnection {
            aggregate {
                count
            }
        }
        items: customers(start: $start limit: $pagination where: {_q: $search}) {
            id name avatar {src: url} created_at
        }
    }
`