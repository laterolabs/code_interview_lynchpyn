import * as React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { Loading } from "~/components/shared";
import { observer } from "mobx-react";
import { useMst } from "~/setup/root";
import { KeyActivitiesList } from "../../key-activities/key-activities-list";
import * as R from "ramda";
// import ReactPaginate from "react-paginate";
import ReactPaginate from '@material-ui/lab/Pagination';

export interface IHomeKeyActivities {
  todayOnly?: boolean;
}

export const PaginatedActivities = observer(
  (): JSX.Element => {
    const {
      keyActivityStore,
      sessionStore: { scheduledGroups },
    } = useMst();
    const { loading } = keyActivityStore;

    useEffect(() => {
      keyActivityStore.fetchAllKeyActivities({ page: 1 });
    }, []);

    const todayFilterGroupId = R.path(
      ["id"],
      scheduledGroups.find(group => group.name == "Today"),
    );

    const handlePageClick = (event, value) => {
      console.log(event,value ,"event--")
      keyActivityStore.fetchAllKeyActivities({ page: value });
    };

    const showKeyActivities = () => {
      return keyActivityStore.allActivities;
    };

    if (loading) {
      return <Loading />;
    } else if (!loading) {
      return (
        <div className="commentBox">
          <KeyActivitiesList
            keyActivities={showKeyActivities()}
            droppableId={`todays-activities-${todayFilterGroupId}`}
            paginated={true}
          />
        <ReactPaginate count={keyActivityStore.totalPages} page={keyActivityStore.currentPage} onChange={handlePageClick} />

          {/* <ReactPaginate
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
          /> */}
        </div>
      );
    }
  },
);

type FilterOptionsContainerProps = {
  currentSelectedItem: boolean;
};
