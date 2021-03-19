import * as React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useMst } from "~/setup/root";
import { KeyActivitiesList } from "../../key-activities/key-activities-list";
import * as R from "ramda";
import ReactPaginate from "react-paginate";

export const CompletedKeyActivities = observer(
  (): JSX.Element => {
    const {
      keyActivityStore,
      sessionStore: { scheduledGroups },
    } = useMst();
    const { loading } = keyActivityStore;

    useEffect(() => {
      keyActivityStore.getCompletedKeyActivities({ page: 1 });
    }, []);

    const todayFilterGroupId = R.path(
      ["id"],
      scheduledGroups.find(group => group.name == "Today"),
    );

    const handlePageClick = ({ selected: selectedPage }) => {
      keyActivityStore.getCompletedKeyActivities({ page: selectedPage + 1 });
    };

    const showKeyActivities = () => {
      return keyActivityStore.allKeyActivities;
    };

    return (
      <div className="commentBox">
        <KeyActivitiesList
          keyActivities={showKeyActivities()}
          droppableId={`todays-activities-${todayFilterGroupId}`}
          paginated={true}
        />
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={keyActivityStore.totalPages}
          initialPage={0}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  },
);
