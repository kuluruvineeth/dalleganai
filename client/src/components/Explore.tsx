import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Image, ImageModalState } from "../types/types";
import imageService from "../services/image.service";
import { removeDuplicatedById } from "../utils";

interface ImageModalProps {
  setImageModalState: Dispatch<SetStateAction<ImageModalState>>;
}

const Explore = ({ setImageModalState }: ImageModalProps) => {
  const [generatedImages, setGeneratedImages] = useState<Image[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);

    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  useEffect(() => {
    if (!isEnded && !isFetching) {
      fetch();
    }
  }, [page]);

  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((page) => page + 1);
    }
  };

  const fetch = async () => {
    try {
      setIsFetching(true);
      const res = await imageService.fetchImages(page);
      console.log(res);
      if (res.status === 201 || res.status === 200) {
        const images: Image[] = res?.data?.data || [];

        setIsEnded(images.length === 0);

        setGeneratedImages((prevValue) =>
          removeDuplicatedById([...prevValue, ...images])
        );
      }
    } catch (error) {
      console.log("Error : ", error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="container mx-auto max-w-screen-xl mt-16 px-3">
      <div className="mb-5">
        <h2 className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-3xl font-bold">
          Explore
        </h2>
        <p className="mt-2 text-xs sm:text-sm">
          Up unitl now, Our application has generated beautiful images. Be
          jolted to see what it can do for you.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {generatedImages?.length > 0 &&
          generatedImages?.map((image) => (
            <div
              key={image._id}
              className="cursor-pointer hover:scale-105 transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setImageModalState((pre) => ({
                  ...pre,
                  open: true,
                  imgSrc: image.imageUrl,
                  prompt: image.prompt,
                }));
              }}
            >
              <img
                key={image._id}
                className="h-auto w-80 rounded-lg"
                src={image.imageUrl}
                alt={image.prompt}
              />
            </div>
          ))}
        {isFetching &&
          [1, 2, 3, 4, 5, 6, 7, 8].map((ele) => (
            <div
              key={ele}
              className="h-48 lg:h-80 bg-gray-200 rounded-lg dark:bg-gray-700 animate-pulse"
            ></div>
          ))}
      </div>
    </div>
  );
};

export default Explore;