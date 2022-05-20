import * as React from "react";
import * as Mui from "@mui/material";
import { ItemList, PostItem } from "./view";
import { Atfbanner } from "components";
import { Filter } from "./view/filter";
import * as ReactQuery from "react-query";
import * as Server from "api";
import * as Layouts from "layouts";

export const Main = () => {
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState<string[]>([]);

  const [postList, setPostList] = React.useState<PostList[]>([]);
  const [pageNumber, setPageNumber] = React.useState(1);

  const value = React.useContext(Layouts.Mainlayouts.SearchContext);

  const { isLoading,refetch } = ReactQuery.useQuery<PostList[]>(
    ["listBuyanihan", category, value],
    async () => {
      const data = await Server.Server.Client().post(
        Server.Server.ApiRoutes.buyanihan.listBuyanihan,
        {
          search: value,
          pageNumber:1,
          filterCategory: category,
        }
      );
      setPageNumber(+data.data.totalPages || 1);
      return data.data.data;
    },
    {
      onSuccess: (data) => {
        setPostList(data);
        console.log(data);
      },
    }
  );

  const FilterProps = {
    open,
    setOpen,
    selected: category,
    setSelected: setCategory,
  };

  return (
    <Mui.Box sx={{ height: "auto" }}>
      <Mui.Grid container>
        <Mui.Grid item xs={12}>
          <PostItem refetch={refetch}/>
        </Mui.Grid>
        {postList?.length <= 0 ? (
          <Mui.Grid item xs={12} sx={{ marginTop: "20px" }}>
            <ItemList isTop={true} setOpen={setOpen} />
          </Mui.Grid>
        ) : (
          new Array(Math.ceil(postList?.length / 6))
            .fill("count")
            .map((_i, j) => {
              return (
                <React.Fragment key={j}>
                  <Mui.Grid item xs={12} sx={{ marginTop: "20px" }}>
                    <ItemList
                      postList={postList?.slice(j * 6, j * 6 + 6)}
                      isTop={j === 0}
                      setOpen={setOpen}
                    />
                  </Mui.Grid>
                  {j + 1 < Math.ceil(postList?.length / 6) ? (
                    <Mui.Grid item xs={12} sx={{ mt: "20px" }}>
                      <Atfbanner />
                    </Mui.Grid>
                  ) : (
                    <></>
                  )}
                </React.Fragment>
              );
            })
        )}
        <Filter {...FilterProps} />
      </Mui.Grid>
    </Mui.Box>
  );
};

export interface PostList {
  _id: string;
  uid?: string;
  item_name: string;
  purpose_to_add: string;
  enter_your_price: string;
  is_this_price: string;
  post_images: string[];
  category: string;
  full_name: string;
  profile_photo: string;
  likedBy: string;
  location: string;
  number_of_likes?: number;
  number_of_comments?: number;
}
