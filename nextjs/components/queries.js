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
            id name avatar {src: url} created_at updated_at
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
            id name avatar {src: url} created_at updated_at
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
            id name avatar {src: url} created_at updated_at
        }
    }
`

export const GET_TEMPLATES = gql`
    query($start: Int! $pagination: Int = 10 $search: String = null){
        count: templatesConnection(start: $start limit: $pagination where: {_q: $search}) {
            aggregate {
                count
            }
        }
        total: templatesConnection {
            aggregate {
                count
            }
        }
        items: templates(start: $start, limit: $pagination, where: {_q: $search}) {
            id name clauses {id description} created_at updated_at
        }
    }
`

export const GET_CLAUSES = gql`
    query($start: Int! $pagination: Int = 10 $search: String = null){
        count: clausesConnection(start: $start limit: $pagination where: {_q: $search}) {
            aggregate {
                count
            }
        }
        total: clausesConnection {
            aggregate {
                count
            }
        }
        items: clauses(start: $start, limit: $pagination, where: {_q: $search}) {
            id description created_at updated_at
        }
    }
`

export const GET_CONTRACTS = gql`
    query($start: Int! $pagination: Int = 10 $search: String = null){
        count: contractsConnection(start: $start limit: $pagination where: {_q: $search}) {
            aggregate {
                count
            }
        }
        total: contractsConnection {
            aggregate {
                count
            }
        }
        items: contracts(start: $start, limit: $pagination, where: {_q: $search}) {
            id number customer {name} created_at updated_at
        }
    }
`

export const CREATE_CONTRACT = gql`
    mutation ($number: String! $clauses: [ComponentContractsClauseInput]! $customer: ID! $template: ID!){
        createContract(input: {data: {number: $number clauses: $clauses customer: $customer template: $template}}) {
            contract {
                id number created_at updated_at
            }
        }
    }
`