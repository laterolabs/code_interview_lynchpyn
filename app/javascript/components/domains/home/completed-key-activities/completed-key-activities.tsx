import * as React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useMst } from "~/setup/root";
import { KeyActivitiesList } from "../../key-activities/key-activities-list";
import * as R from "ramda";
import ReactPaginate from "react-paginate";
import { Heading } from "~/components/shared";

export const CompletedKeyActivities = observer(
  (): JSX.Element => {
    const {
      keyActivityStore,
      sessionStore: { scheduledGroups },
    } = useMst();

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

    const renderHeader = (
      header: string,
    ): JSX.Element => {
      return (
        <>
          <HeaderRowContainer>
            <StyledHeading type={"h2"} fontSize={"20px"}>
              {header}
            </StyledHeading>
          </HeaderRowContainer>
        </>
      );
    };

    return (
      <Container>
        <SingleListContainer>
          <HeaderContainer>
            {renderHeader(
              "Completed",
            )}
          </HeaderContainer>
          <KeyActivitiesListContainer>
            <KeyActivitiesList
              keyActivities={showKeyActivities()}
              droppableId={`todays-activities-${todayFilterGroupId}`}
              disableEditing={true}
              paginated={true}
            />
          </KeyActivitiesListContainer>
          <PaginationContainer>
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              breakLabel={"..."}
              breakClassName={"page-item"}
              pageCount={keyActivityStore.totalPages}
              initialPage={0}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              breakLinkClassName={'page-link'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
              activeClassName={'active'}
            />
          </PaginationContainer>
        </SingleListContainer>
      </Container>
    );
  },
);

const Container = styled.div`
  display: flex;
  width: 70%;
`;

const SingleListContainer = styled.div`
  width: 50%;
  margin-right: 20px;
`;

const HeaderContainer = styled.div``;

const HeaderRowContainer = styled.div`
  display: flex;
`;

const StyledHeading = styled(Heading)`
  font-weight: bold;
`;

const KeyActivitiesListContainer = styled.div`
`;

const PaginationContainer = styled.div`
  .pagination > li {
    display: inline-block;
    padding-left: 0;
  }
  .pagination > li {
    list-style: none;
    border: 0.9px solid;
  }
  .pagination > li > a,
  .pagination > li > span {
    position: relative;
    float: left;
    padding: 6px 12px;
    line-height: 1.42857143;
    text-decoration: none;
    color: #2c689c;
    background-color: #fff;
    border: 1px solid #ddd;
    margin-left: -1px;
  }
  
  .pagination>li.active>a {
    color: #fff;
    background-color: #218838;
    border-color: #1e7e34;
  }
  
  /* Style the active class (and buttons on mouse-over) */
  .pagination > li > a:hover {
    background-color:  #218838;
    color: white;
  }
  .pagination > li:first-child > a,
  .pagination > li:first-child > span {
    margin-left: 0;
      padding: 0px;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
    display: none!important;
  }
  .pagination > li:last-child > a,
  .pagination > li:last-child > span {
    border-bottom-right-radius: 4px;
    margin-right: 0;
    padding: 0px!important;
    border-top-right-radius: 4px;
    display: none!important;
  }
`;
