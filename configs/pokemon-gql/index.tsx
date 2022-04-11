import { gql } from "@apollo/client";
export const GET_QUERY: any = gql`
query pokemons($limit: Int, $offset: Int) {
  pokemons(limit: $limit, offset: $offset) {
    count
    next
    previous
    status
    message
    results {
      id
      url
      name
      image
    }
  }
}`

export const GET_DETAIL: any = gql`
query pokemon($name:String!) {
  pokemon(name: $name ) {
    id
    height
    weight    
    abilities {
        ability {
          id
          name
          url
        }
        is_hidden
        slot
    }
    stats{
      base_stat
    }
    species{
      name
      url
    }
    types{
      type{
        name
      }
    }
    moves {
      move {
        name
      }
    }
  }
}
`