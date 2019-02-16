import React from 'react';
import { Mutation } from 'react-apollo'
import { css } from 'emotion'
import { REPOSITORY_FRAGMENT } from './fragments'
import Link from './link';
import Button from './button'
import './style.css'
import {
  STAR_REPOSITORY,
  UNSTAR_REPOSITORY,
} from './mutations';

export default class RepositoryItem extends React.Component {
  render () {
    const{ id,
  name,
  url,
  descriptionHTML,
  stargazers,
  viewerHasStarred,} =this.props
    return (
  (
  <div>
    <div className="RepositoryItem-title">
      <h2>
        <Link href={url}>{name}</Link>
      </h2>

      <div>
        {!viewerHasStarred ? (
          <Mutation
           errorPolicy="all"
            mutation={STAR_REPOSITORY}
            variables={{ id }}
            optimisticResponse={{
              addStar: {
                __typename: 'Mutation',
                starrable: {
                  __typename: 'Repository',
                  id,
                  viewerHasStarred: !viewerHasStarred,
                },
              },
            }}
            update={this.updateAddStar}
          >
            {(addStar, { data, loading, error }) => {
               if (error) return <strong className={css`color:red;`}>organization has enabled OAuth App access restrictions</strong>

              return(<Button
                onClick={addStar}
              >
                {stargazers.totalCount} Star
              </Button>)
          }}
          </Mutation>
        ) : (
          <Mutation
            mutation={UNSTAR_REPOSITORY}
            variables={{ id }}
             errorPolicy="all"
            optimisticResponse={{
              removeStar: {
                __typename: 'Mutation',
                starrable: {
                  __typename: 'Repository',
                  id,
                  viewerHasStarred: !viewerHasStarred,
                },
              },
            }}
            update={this.updateRemoveStar}
          >
            {(removeStar, { data, loading, error }) => {
               if (error) return <strong className={css`color:red;`}>organization has enabled OAuth App access restrictions</strong>;
               return(
                  <Button
                onClick={removeStar}
              >
                {stargazers.totalCount} Unstar
              </Button>
               )
            }}
          </Mutation>
        )}
      </div>
    </div>

    <div className="RepositoryItem-description">
      <div
        className="RepositoryItem-description-info"
        dangerouslySetInnerHTML={{ __html: descriptionHTML }}
      />
      </div>
    </div>
)
    )
  }
  updateAddStar = (
  client,
  {
    data: {
      addStar: {
        starrable: { id, viewerHasStarred },
      },
    },
  },
) =>
  client.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: this.getUpdatedStarData(client, id, viewerHasStarred),
  });

  updateRemoveStar = (
  client,
  {
    data: {
      removeStar: {
        starrable: { id, viewerHasStarred },
      },
    },
  },
) => {
  client.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: this.getUpdatedStarData(client, id, viewerHasStarred),
  });
};

getUpdatedStarData = (client, id, viewerHasStarred) => {
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
  });

  let { totalCount } = repository.stargazers;
  totalCount = viewerHasStarred ? totalCount + 1 : totalCount - 1;

  return {
    ...repository,
    stargazers: {
      ...repository.stargazers,
      totalCount,
    },
  };
};


}

