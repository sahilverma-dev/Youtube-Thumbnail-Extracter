import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdDownload } from "react-icons/md";
import { useState } from "react";
import { Button, buttonVariants } from "../ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { AnimatePresence, motion } from "framer-motion";
import { galleryVariants, imageVariants } from "@/lib/constants/variants";
import { ClipboardPasteIcon } from "lucide-react";

interface Thumbnail {
  url: string;
  size: string;
}

const getThumbnails = (id: string): Thumbnail[] => [
  {
    url: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    size: "1280x720",
  },
  {
    url: `https://img.youtube.com/vi/${id}/maxres1.jpg`,
    size: "1280x720",
  },
  {
    url: `https://img.youtube.com/vi/${id}/maxres2.jpg`,
    size: "1280x720",
  },
  {
    url: `https://img.youtube.com/vi/${id}/maxres3.jpg`,
    size: "1280x720",
  },
  {
    url: `https://img.youtube.com/vi/${id}/sddefault.jpg`,
    size: "640x480",
  },
  {
    url: `https://img.youtube.com/vi/${id}/sd1.jpg`,
    size: "640x480",
  },
  {
    url: `https://img.youtube.com/vi/${id}/sd2.jpg`,
    size: "640x480",
  },
  {
    url: `https://img.youtube.com/vi/${id}/sd3.jpg`,
    size: "640x480",
  },
  {
    url: `https://i3.ytimg.com/vi/${id}/hqdefault.jpg`,
    size: "480x360",
  },
  {
    url: `https://i.ytimg.com/vi/${id}/hq1.jpg`,
    size: "480x360",
  },
  {
    url: `https://i.ytimg.com/vi/${id}/hq2.jpg`,
    size: "480x360",
  },
  {
    url: `https://i.ytimg.com/vi/${id}/hq3.jpg`,
    size: "480x360",
  },
  {
    url: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
    size: "320x180",
  },
  {
    url: `https://img.youtube.com/vi/${id}/mq1.jpg`,
    size: "320x180",
  },
  {
    url: `https://img.youtube.com/vi/${id}/mq2.jpg`,
    size: "320x180",
  },
  {
    url: `https://img.youtube.com/vi/${id}/mq3.jpg`,
    size: "320x180",
  },
  {
    url: `https://img.youtube.com/vi/${id}/default.jpg`,
    size: "120x90",
  },
  {
    url: `https://img.youtube.com/vi/${id}/1.jpg`,
    size: "120x90",
  },
  {
    url: `https://img.youtube.com/vi/${id}/2.jpg`,
    size: "120x90",
  },
  {
    url: `https://img.youtube.com/vi/${id}/3.jpg`,
    size: "120x90",
  },
];

const getVideoId = (url: string) => {
  if (url?.startsWith("https://www.youtube.com/shorts/")) {
    return url?.split("/")[4];
  } else {
    let regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    let match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }
};

const formSchema = z.object({
  url: z
    .string()
    .url("Please enter a Youtube URL")
    .regex(
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?v=)|(shorts\/))([^#&?]*).*/,
      "Please enter a valid Youtube URL"
    ),
});

const ThumbnailForm = () => {
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const id = getVideoId(values.url);
    console.log(id, values.url);
    if (id) {
      setThumbnails(getThumbnails(id));
    }
  }

  return (
    <div className="p-2 w-full max-w-7xl space-y-3 mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Youtube video/shorts URL</FormLabel>
                <FormControl>
                  <div className="w-full flex items-center gap-2">
                    <Input
                      placeholder="Enter your Youtube video/shorts URL"
                      className="flex-grow"
                      {...field}
                    />
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant={"secondary"}
                        size={"icon"}
                        onClick={async () => {
                          const url = await navigator.clipboard.readText();
                          form.setValue("url", url);
                          form.handleSubmit(onSubmit)();
                        }}
                        className="flex-shrink-0"
                      >
                        <ClipboardPasteIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        type="submit"
                        size={"icon"}
                        className="flex-shrink-0"
                      >
                        <MdDownload />
                      </Button>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <AnimatePresence mode="wait">
        {thumbnails.length > 0 ? (
          <motion.div
            variants={galleryVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-4 gap-2"
          >
            {thumbnails.map((thumbnail) => (
              <motion.div
                key={thumbnail.url}
                variants={imageVariants}
                className="relative aspect-video overflow-hidden rounded-md border"
              >
                <span className="absolute top-2 left-2 bg-secondary-foreground/50 backdrop-blur rounded px-2 py-1 text-xs text-secondary border border-background/20">
                  {thumbnail.size}
                </span>
                <img
                  src={thumbnail.url}
                  alt={thumbnail.size}
                  className="w-full h-full object-cover"
                />
                <a
                  href={thumbnail.url}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({
                    variant: "secondary",
                    size: "icon",
                    className:
                      "aspect-square absolute bottom-2 right-2 bg-green-500 text-white",
                  })}
                >
                  <MdDownload size={18} />
                </a>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div
            className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
            role="alert"
          >
            Download youtube video, live and shorts thumbnail images of all
            quality for free. This application let you download thumbnails of
            all quality. Just paste the URL of the thumbnail video in the below
            input and click Get Thumbnail Image
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThumbnailForm;
