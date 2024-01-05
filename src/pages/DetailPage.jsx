import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { baseImgURL, options } from "../constant"
import millify from "millify"
import { Splide, SplideSlide } from "@splidejs/react-splide"

const DetailPage = () => {

  const [movie, setMovie] = useState(null)

  console.log(movie);

  const { id } = useParams()



  useEffect(() => {
    axios.get(`/movie/${id}?append_to_response=credits%2Cvideos%2Creviews&language=en-US`, options)
      .then((res) => setMovie(res.data))
  }, [])

  return (
    <div className="row ">
      {
        !movie ? (
          <div className="spinner-border text-danger" role="status"></div>
        ) : (
          <>
            {/*top-side*/}
            <div className="col-12 banner">
              <img
                className="w-100 h-100 object-fit-cover"
                src={baseImgURL + movie.backdrop_path}
              />


              <div className="banner-bg">
                <span>{movie.title}</span>
              </div>
            </div>

            <div className="container p-4 p-md-5 d-flex flex-wrap">

              {/*left-side*/}
              <div className="col-md-6 mt-4 ">

                {/*Companies */}
                <h3>Production Companies</h3>
                <div className="d-flex flex-wrap gap-4">
                  {movie.production_companies.map((i) => (
                    <div className="bg-white rounded p-2 d-flex align-items-center">
                      {i.logo_path ?
                        (<img className="object-fit-container" width={100} height={50} src={baseImgURL + i.logo_path} />
                        ) : (
                          <span className="company">{i.name}</span>
                        )}
                    </div>
                  ))}
                </div>

                {/*Languages */}
                <h3 className="mt-4">Spoken Languages</h3>
                <div className="d-flex flex-wrap gap-4">
                  {movie.spoken_languages.map((i) => (
                    <div className="bg-white rounded p-2 d-flex align-items-center">

                      <span className="company">{i.name}</span>
                    </div>
                  ))}
                </div>

                {/*Countries */}
                <h3 className="mt-4">Production Countries</h3>
                <div className="d-flex flex-wrap gap-4">
                  {movie.production_countries.map((i) => (
                    <div className="bg-white rounded p-2 d-flex align-items-center">
                      <span className="company">{i.name}</span>
                    </div>
                  ))}
                </div>
              </div>


              {/*right-side*/}
              <div className="col-md-6 mt-4 ">
                <p className="lead">{movie.overview}</p>

                <p className="fs-5">
                  <span>Budget: </span>
                  <span className="text-secondary">${millify(movie.budget)}</span>
                </p>

                <p className="fs-5">
                  <span>Revenue: </span>
                  <span className="text-secondary">${millify(movie.revenue)}</span>
                </p>
              </div>

              {/*Actors*/}
              <div className="col-12  my-3">
                <h2>Actors</h2>
                <Splide options={{
                  height: "200px",
                  gap: '10px',
                  pagination: false,
                  autoWidth: true,
                }}>

                  {movie.credits.cast.map((i) => (
                    <SplideSlide>
                      <div className="actor-card h-100">
                        <img
                          className="movie"
                          src={i.profile_path ? baseImgURL + i.profile_path : '/default-profile.jpg'}
                        />
                        <p>
                          <span>{i.character}</span>
                          <span>{i.name}</span>
                        </p>
                      </div>


                    </SplideSlide>
                  ))}

                </Splide>
              </div>

              {/*Videos*/}
              <div className="my-5 ">
                <h1>Videos</h1>
                <Splide options={{ height: '50vh' }}>
                  {movie.videos.results.map((video, index) => (
                    <SplideSlide key={index}>
                      <iframe
                        width='100%'
                        height='100%'
                        src={`https://www.youtube.com/embed/${video.key}`}>
                      </iframe>
                    </SplideSlide>

                  ))}
                </Splide>
              </div>

              {/*Reviews*/}
              <div className="my-5">
                <h1>Reviews</h1>
                {movie.reviews.results.map((rev) => (
                  <p>{rev.content}</p>
                ))}
              </div>


            </div>

          </>
        )}

    </div>
  )

}

export default DetailPage