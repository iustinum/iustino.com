# Images of the Russian Empire

## Colorizing the Prokudin-Gorskii Photo Collection

### Sep 9, 2024

![cover](/assets/images/iustino.com/icon_contrasted.jpg)

When I first came across Sergei Prokudin-Gorskii’s work, I was blown away by how ambitious his project was. Back in the early 1900s, he was using red, green, and blue filters to take three separate photos of each scene, all on glass plates. His method was way ahead of its time. Now, more than a century later, these plates have been digitized by the Library of Congress and made available to everyone. My goal was to take these digitized plates and, using modern image processing, align the three color channels and turn those black-and-white images into full-color photographs.

I noticed pretty quickly that the three color channels - blue, green, and red - weren’t lined up correctly. To get a good color image, I needed to fix that. I picked the blue channel as my reference and aligned the green and red channels to it.

The simplest way to do this is by sliding the green or red channel over the blue one and checking how well they match at each position. This is called "2D correlation" or "template matching." You basically multiply the pixel values at each position and add them up, and the spot with the highest score is where the alignment is best. To keep things efficient, I only searched within a small window, moving the image up to 15 pixels in any direction.

But this approach had some problems. The white borders around the images messed with the scores because white pixels have really high intensity. If part of the border overlapped, it could give a high score even if the channels weren’t actually aligned well. Plus, some images, like Emir, had big brightness differences between the channels, which threw off the results.

So I found a better method called Structural Similarity Index Measure (SSIM). SSIM doesn’t just look at pixel values—it also takes into account three things:

1. Luminance: It adjusts for brightness differences.

2. Contrast: It looks at the differences between light and dark areas.

3. Structure: It compares patterns and shapes in the images, focusing on the overall structure instead of individual pixels.

Here’s what the alignment looked like when I ran it with SSIM:

![emir-aligned](/assets/images/iustino.com/emir_aligned.jpg)

Green channel shift: (50, 21)
Red channel shift: (105, 40)

![lady-aligned](/assets/images/iustino.com/lady_aligned.jpg)

Green channel shift: (57, 8)
Red channel shift: (120, 12)

![harvesters-aligned](/assets/images/iustino.com/harvesters_aligned.jpg)

Green channel shift: (59, 14)
Red channel shift: (122, 11)

![onion-church-aligned](/assets/images/iustino.com/onion_church_aligned.jpg)

Green channel shift: (52, 24)
Red channel shift: (108, 35)

![train_aligned](/assets/images/iustino.com/train_aligned.jpg)

Green channel shift: (40, -2)
Red channel shift: (85, 29)

![sculpture-aligned](/assets/images/iustino.com/sculpture_aligned.jpg)

Green channel shift: (33, -11)
Red channel shift: (134, -25)

One of the challenges I ran into was how long it took to process the bigger TIF files. My first algorithm worked fine for smaller JPGs, but when I tried it on the larger images, it just took way too long to align them. As the images got bigger, the processing time shot up, so I knew I had to come up with a faster solution.

That’s when I decided to try the pyramid approach. The idea is to shrink the image down by half repeatedly until it’s small enough to handle easily - around 300 pixels wide. I’d align the channels at this smaller size, then apply those shifts back to the larger image, tweaking the alignment as I moved up to the full size. This made everything run much faster, turning what was a slow, polynomial runtime into logarithmic, which was much quicker.

After aligning the color channels, I noticed that things weren’t perfect. There were weird colored borders around the edges, probably because the channels didn’t line up exactly at the borders. Also, the contrast was a bit off - the colors looked kind of dull and flat.

To fix the borders, I came up with an automatic cropping method. The idea was to look at how the channels differed in pixel intensity. Where the channels didn’t agree, it was likely just noise or artifacts, and where they matched, that was the real content of the image. By checking the rows and columns, I could automatically crop out those bad borders and clean things up nicely.

For the contrast, I used a simple technique called histogram equalization. Basically, it adjusts the image so the darkest parts are really dark and the brightest parts are really bright, making better use of the full color range. This made the images look a lot more vibrant and brought back some of the depth and detail that had gotten lost during the alignment.

Here are the contrasted version of the images above:

![emir-contrasted](/assets/images/iustino.com/emir_contrasted.jpg)

![lady-contrasted](/assets/images/iustino.com/lady_contrasted.jpg)

![harvesters-contrasted](/assets/images/iustino.com/harvesters_contrasted.jpg)

![onion-church-contrasted](/assets/images/iustino.com/onion_church_contrasted.jpg)

![train_contrasted](/assets/images/iustino.com/train_contrasted.jpg)

![sculpture-contrasted](/assets/images/iustino.com/sculpture_contrasted.jpg)

This project was really rewarding. It wasn’t just about solving technical problems - it also let me explore the fascinating history behind early color photography. I got to dive into Prokudin-Gorskii’s work and figure out how to make these old black-and-white images come to life in color. At first, I struggled with some simple alignment methods that didn’t quite work, but then I started experimenting with SSIM and the pyramid approach, which made everything so much better. It was a fun mix of exploring history and tackling modern tech challenges. In the end, I added my own touches with automatic cropping and contrast adjustments, and while the final images might not be as perfect as the hand-restored ones, there’s just something really satisfying about seeing them in color and knowing that I made it happen with code.