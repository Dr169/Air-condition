import { useState, useEffect } from "react";

import {
  Box,
  Card,
  CircularProgress,
  Avatar,
  Pagination,
  Stack,
} from "@mui/material";

import { gql, useQuery } from "@apollo/client";

import { AlertDialog } from "./AlertDialog";

const getUserCunt = gql`
  query getuser {
    users {
      results {
        id
        firstName
        lastName
      }
      totalCount
    }
  }
`;

export const UserInfo = () => {
  const [page, setPage] = useState(1);
  const { loading, error, data, startPolling, stopPolling } =
    useQuery(getUserCunt);

  useEffect(() => {
    startPolling(1000);

    return () => {
      stopPolling();
    };
  }, []);

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
  if (error) {
    return <div>Error!{error.message}</div>;
  }

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box>
      <Stack
        spacing={2}
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          height: "382px",
        }}
      >
        {data.users.results.slice((page - 1) * 5, page * 5).map((user) => {
          return (
            <Card
              sx={{
                width: "95%",
                margin: "10px",
                display: "flex",
                alignItems: "center",
                fontSize: "1rem",
                position: "relative",
              }}
            >
              <Avatar
                sx={{
                  margin: "10px",
                  width: "30px",
                  height: "30px",
                  fontSize: "0.8rem",
                  color: "primary.dark",
                  bgcolor: "secondary.main",
                }}
              >
                {user.firstName[0]} {user.lastName[0]}
              </Avatar>
              {user.firstName} {user.lastName}
              <AlertDialog id={user.id} />
            </Card>
          );
        })}

        <Pagination
          count={Math.ceil(data.users.totalCount / 5)}
          page={page}
          onChange={handleChange}
          color="primary"
          sx={{ position: "absolute", bottom: "0px" }}
        />
      </Stack>
    </Box>
  );
};
