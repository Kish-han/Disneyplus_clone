import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from '../axios'
import { useNavigate } from "react-router-dom";

const Row = ({ title, fetchUrl }) => {

    const base_url = "https://image.tmdb.org/t/p/original"
    const navigate = useNavigate();

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n-1) + '...' : string
    }

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        console.log(movies)
        fetchData();

    }, [fetchUrl])

    return (
        <Container>
            <h2>{title}</h2>
            <RowPoster>
                {movies.map(movie => (
                    (movie.backdrop_path &&
                        <Holder>
                            <ImageBox>
                                <img
                                    onClick={()=>navigate('/details')}
                                    key={movie.id}
                                    src={`
                            ${base_url}${movie.backdrop_path}
                            `} alt={movie.name} />
                                {/* <Hoverdesc className='hoverdesc'>
                                    <p>{ truncate(movie.overview, 100) }</p>
                                </Hoverdesc> */}
                                
                            </ImageBox>
                            <p>{movie.title ? movie.title : movie.name}</p>
                        </Holder>
                    )
                ))}
            </RowPoster>
        </Container>
    )
}

export default Row

const Container = styled.div`
    color: white;
    margin-left: 10px;
`

const RowPoster = styled.div`
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;
    padding: 10px;
    transition: transform 450ms;

    img{
        object-fit: contain;
        max-height: 100px;
        margin-bottom: 10px;
        margin-right: 10px;
        box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;
        transition: transform 450ms;
        cursor: pointer;
        z-index: 1;
        &:hover{
            transform: scale(1.06);
            opacity: 1;
            z-index: 10;
        }
    }

    &::-webkit-scrollbar{
        display: none;
    }
`
const Holder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    
    p{
        margin-top: 10px;   
        font-weight: 500;
        font-size: 15px;
        letter-spacing: 1.2px;
    }
    `

const ImageBox = styled.div`
    position: relative;

    &:hover{
        .hoverdesc{
            display: block;
        }
    }
`
const Hoverdesc = styled.div`
    color: white;
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: none;
    background-color: rgba(0 , 0, 0, 0.5);
    
    p{
        font-size: 10px;
        text-align: left;
        color: white;
        cursor: pointer;
    }
`