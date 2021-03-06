import React from 'react';

import ProposalsList from "./volt/components/ProposalsList";
import SortContols from "./volt/components/SortControls";
import FilterControls from "./volt/components/FilterControls";
import { contains } from "./volt/utils";

export default function MainPage({
  proposalsList = [],
  filterList,
  resetFilter,
  sort,
  sorting,
  sortingOrder,
  toggleFavorites,
  filterQuery,
  favorites,
  userVotes
}) {
  const filteredList = React.useMemo(() => {
    const sortFunctions = {
      votes: (a, b) => {
        const aVotes = userVotes[a.id] || 0;
        const bVotes = userVotes[b.id] || 0;
        return (aVotes - bVotes) * sortingOrder
      },
      id: (a, b) => a.proposalId.localeCompare(b.proposalId) * sortingOrder,
      favorite: (a, b) => (
        Number(!!favorites[b.proposalId]) - Number(!!favorites[a.proposalId])
      ) * sortingOrder
    };
    const lcQuery = filterQuery.toLowerCase();

    const newList = proposalsList.filter(proposal => {
      const inTitle = contains(proposal.title, lcQuery);
      const inDescription = contains(proposal.description, lcQuery);
      const inId = contains(proposal.proposalId, lcQuery);
      const inTopics = proposal.topic.some(topic => contains(topic, lcQuery));
      return inTitle || inDescription || inId || inTopics;
    });

    const sortFunction = sortFunctions[sorting];
    if (sortFunction) {
      return newList.sort(sortFunction);
    } else {
      return newList;
    }
  }, [proposalsList, filterQuery, sorting, favorites, sortingOrder]);

  return (
    <>
      <FilterControls
        filter={filterList}
        query={filterQuery}
        reset={resetFilter}
      />
      <SortContols sort={sort} sorting={sorting} />
      <ProposalsList
        list={filteredList}
        toggle={toggleFavorites}
        favorites={favorites}
        userVotes={userVotes}
      />
    </>
  );
}
