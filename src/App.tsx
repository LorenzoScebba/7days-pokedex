import React, {useEffect} from 'react';
import ApplicationBar from "./components/ApplicationBar";
import {fetchAllPokemons} from "./redux/slices/pokemonSlice";
import {Route, Switch} from "wouter";
import PokemonList from "./pages/PokemonList";
import PokemonDetail from "./pages/PokemonDetail";
import {useAppDispatch} from "./redux/hooks";

function App() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllPokemons());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <ApplicationBar/>
            <Switch>
                <Route path="/" component={PokemonList} />
                <Route path="/:id" component={PokemonDetail} />
            </Switch>
        </div>
    );
}

export default App;
