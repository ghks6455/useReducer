import "./App.css";
import { useReducer, useEffect } from "react";
import { SUCCESS, ERROR, LOADING } from "./const";
import Btn from "./Btn";

function App() {
  const token = import.meta.env.VITE_I_AM_KEY;
  console.log(token);

  const initState = {
    loading: false,
    error: null,
    userData: null,
    repoData: [], // repoData를 초기 상태로 설정
  };

  const [state, dispatch] = useReducer(reducer, initState);

  function reducer(state, action) {
    switch (action.type) {
      case SUCCESS:
        return {
          ...state,
          loading: false,
          userData: action.data.userData,
          repoData: action.data.repoData,
        };
      case LOADING:
        return { ...state, loading: true, error: null };
      case ERROR:
        return { ...state, loading: false, error: action.error };
      default:
        throw new Error("Unknown action type");
    }
  }

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: LOADING });
      try {
        // 사용자 데이터 가져오기
        const userResponse = await fetch("https://api.github.com/users/ghks6455", {
          headers: {
            Authorization: `token ${token}`,
            "User-Agent": "github-profile",
          },
        });
        const userData = await userResponse.json();

        // 레포지토리 데이터 가져오기
        const repoResponse = await fetch("https://api.github.com/users/ghks6455/repos?sort=created", {
          headers: {
            Authorization: `token ${token}`,
            "User-Agent": "github-profile",
          },
        });
        const repoData = await repoResponse.json();

        // 데이터 dispatch
        dispatch({ type: SUCCESS, data: { userData, repoData } });
      } catch (e) {
        dispatch({ type: ERROR, error: e.message });
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2>Github Data API</h2>
      {state.loading && <h2>로딩중...</h2>}
      {state.error && <p>{state.error}</p>}
      {!state.loading && !state.error && state.userData && (
        <div>
          <img src={state.userData.avatar_url} alt="profile" />
          <p>name: {state.userData.login}</p>
          <p>
            follow: {state.userData.following} follower: {state.userData.followers}
          </p>
        </div>
      )}
      <div className="repo">
        {/* repoData를 상태에서 가져와서 렌더링 */}
        {state.repoData.map((data, index) => (
          <Btn key={index} post={data} />
        ))}
      </div>
    </div>
  );
}

export default App;
