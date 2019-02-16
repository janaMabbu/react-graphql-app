import React from 'react';
import { Mutation } from 'react-apollo'

import { REPOSITORY_FRAGMENT } from './fragments'
import Link from './link';
import Button from './button'
import './style.css'
import {
  STAR_REPOSITORY,
  UNSTAR_REPOSITORY,
} from './mutations';




const updateAddStar = (
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
    data: getUpdatedStarData(client, id, viewerHasStarred),
  });

const updateRemoveStar = (
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
    data: getUpdatedStarData(client, id, viewerHasStarred),
  });
};

const getUpdatedStarData = (client, id, viewerHasStarred) => {
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

const RepositoryItem = ({
  id,
  name,
  url,
  descriptionHTML,
  stargazers,
  totalCount,
  viewerHasStarred,
}) => (
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
            update={updateAddStar}
          >
            {(addStar, { data, loading, error }) => {
               if (error) return <p>organization has enabled OAuth App access restrictions</p>;

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
            update={updateRemoveStar}
          >
            {(removeStar, { data, loading, error }) => {
               if (error) return <p>organization has enabled OAuth App access restrictions</p>
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
);

export default RepositoryItem;
