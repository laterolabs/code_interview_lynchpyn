import * as React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useMst } from "~/setup/root";
import { KeyActivitiesList } from "../../key-activities/key-activities-list";
import * as R from "ramda";
import ReactPaginate from "react-paginate";
import * as moment from "moment";
import {CreateKeyActivityButton} from "~/components/domains/key-activities/create-key-activity-button";
import {CreateKeyActivityModal} from "~/components/domains/key-activities/create-key-activity-modal";
import {Heading, Icon} from "~/components/shared";
import {FilterDropdown} from "~/components/domains/key-activities/filter-dropdown";

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

    const renderHeader = (
      header: string,
      subText: string,
    ): JSX.Element => {
      return (
        <>
          <HeaderRowContainer>
            <StyledHeading type={"h2"} fontSize={"20px"}>
              {header}
            </StyledHeading>
          </HeaderRowContainer>
          <HeaderRowContainer>
            <SubHeaderContainer>{subText}</SubHeaderContainer>
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
              moment().format("MMMM D"),
            )}
          </HeaderContainer>
          <KeyActivitiesListContainer>
            <KeyActivitiesList
              keyActivities={showKeyActivities()}
              droppableId={`todays-activities-${todayFilterGroupId}`}
              isDisabledDraggable={true}
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
          </KeyActivitiesListContainer>
        </SingleListContainer>
      </Container>
    );
  },
);

const Container = styled.div`
  display: flex;
  width: 70%;
`;

const ListContainer = styled.div`
  width: 50%;
  margin-right: 20px;
`;

const SingleListContainer = styled.div`
  width: 100%;
  margin-right: 20px;
`;

const FilterContainer = styled.div`
  width: 30px;
  margin-top: 42px;
`;

const HeaderContainer = styled.div``;

const HeaderRowContainer = styled.div`
  display: flex;
`;

const SubHeaderContainer = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.grey100};
  margin-top: auto;
  margin-bottom: auto;
`;

const StyledHeading = styled(Heading)`
  font-weight: bold;
`;

const SortContainer = styled.div`
  margin-left: auto;
  &: hover {
    cursor: pointer;
  }
`;

type FilterOptionsContainerProps = {
  currentSelectedItem: boolean;
};

const FilterOptionContainer = styled.div<FilterOptionsContainerProps>`
  text-align: center;
  height: 27px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 50%;
  justify-content: center;
  display: flex;
  background-color: ${props => props.currentSelectedItem && props.theme.colors.grey20};
  &: hover {
    cursor: pointer;
  }
`;

const KeyActivitiesListContainer = styled.div`
  height: 100%;
`;
