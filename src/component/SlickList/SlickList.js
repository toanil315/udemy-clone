import React, { useState } from 'react'
import Course from '../Course/Course'
import "./SlickList.scss";
import Slider from "react-slick";

const cssArrow = {
    width: "4rem",
    height: "4rem",
    backgroundColor: "$black-color",
    borderRadius: "50%",
    fontSize: "$text-base",
    color: "white",
}

function NextArrow({ currentSlide, slideCount, ...restProps }) {
    return (
        <button
            {...restProps}
            style={{ ...cssArrow }}
        >
            <i className="fa fa-chevron-right"></i>
        </button>
    );
}

function PrevArrow({ currentSlide, slideCount, ...restProps }) {
    return (
        <button
            {...restProps}
            style={{ ...cssArrow }}
        >
            <i className="fa fa-chevron-left"></i>
        </button>
    );
}

function NoneArrow({ currentSlide, slideCount, ...restProps }) {
    return (
        <button
            {...restProps}
            style={{ display: "none" }}
        >
        </button>
    );
}


export default function SlickList(props) {
    const [arrows, setArrows] = useState({
        next: <NextArrow />,
        prev: <NoneArrow />,
    })
    const { listCourses } = props;

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        nextArrow: arrows.next,
        prevArrow: arrows.prev,
        beforeChange: (current, next) => {
            if (next === 0) {
                setArrows({
                    next: <NextArrow />,
                    prev: <NoneArrow />,
                })
            }
            else if (next > 0 && next < listCourses.length - 5) {
                setArrows({
                    next: <NextArrow />,
                    prev: <PrevArrow />,
                })
            }
            else {
                setArrows({
                    prev: <PrevArrow />,
                    next: <NoneArrow />,
                })
            }
        }
    };

    const renderListCourses = () => {
        return listCourses.map((course, index) => {
            return <div className="slider-item" key={index}>
                <Course course={course} />
            </div>
        })
    }

    return (
        <Slider {...settings}>
            {renderListCourses()}
        </Slider>
    )
}
