# Fun with Filters and Frequencies

## Making Mini Versions of Lightroom Toolsets

### Sep 23, 2024

![cover](/assets/images/iustino.com/DSC00560.jpg)

Recall from my previous post, one of the harder problems to deal with in image processing is detecting edges and color differences. To detech edges, we need to find parts where there are drastic changes in pixel values. One way to do this is to turn the original image into a gradient magnitude image. Let's start with taking the derivative of the image in both the x and y direction using **Finite Difference Operators**.

Here is a sample image: Cameraman. We will apply the Finite Difference Operators to it. For simplicity, let's define the $Dx$ operator as:

$$
D_x = \begin{bmatrix}
-1 & 1 \\
\end{bmatrix},

D_y = \begin{bmatrix}
1 \\
-1
\end{bmatrix}
$$

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/cameraman.png "Our sample image")
</image-grid>

We can convolve the image with $D_x$ to get the derivative in the x direction and likewise for $D_y$.

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/dx_cameraman.png "Derivative in the x direction")
![Image 2 Description](/assets/images/iustino.com/image_blending/dy_cameraman.png "Derivative in the y direction")
</image-grid>

The gradient is a vector that points in the direction of the greatest rate of change. This vector consists of two components: rate of change in the x direction and rate of change in the y direction, which are captured by the partial derivatives that we just calculated. Recall that we find the magnitude of a vector by treating its $x$ and $y$ components as perpendicular components of a right triangle. Therefore, to compute the gradient magnitude at each pixel, we apply the Pythagorean theorem:

$$
M(x,y) = \sqrt{I_x^2 + I_y^2}
$$

By setting an arbitrary threshold, where pixels with a gradient magnitude greater than the threshold are considered edges, we can obtain a binary image with edges highlighted (aka an edge image).

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/gradient_magnitude_cameraman.png "Gradient magnitude")
![Image 2 Description](/assets/images/iustino.com/image_blending/edge_image_cameraman.png "Edges")
</image-grid>

Note that the result with just the difference operator is rather noisy. We can apply smoothing to the image to reduce noise before taking the derivative. We can use the **Gaussian Filter** for this.

$$
G(x,y) = \frac{1}{2\pi\sigma^2}e^{-\frac{x^2 + y^2}{2\sigma^2}}
$$

Here is a comparison of the original image and the image with a Gaussian filter applied to it.

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/cameraman.png "Original Cameraman")
![Image 2 Description](/assets/images/iustino.com/image_blending/blurred_cameraman.png "Gaussian filtered Cameraman")
</image-grid>

With this change, let's apply the derivative operators again.

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/dx_blurred_cameraman.png "Derivative in the x direction")
![Image 2 Description](/assets/images/iustino.com/image_blending/dy_blurred_cameraman.png "Derivative in the y direction")
</image-grid>

As you can see, the partial derivatives are much smoother. Let's apply the gradient magnitude filter again to get a better look at the edges.

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/gradient_magnitude_blurred_cameraman.png "Gradient magnitude")
![Image 2 Description](/assets/images/iustino.com/image_blending/edge_image_blurred_cameraman.png "Edges")
</image-grid>

The edges are a lot more pronounced and the noise has clearly been reduced.

Due to the commutativity of convolution, we can apply the derivative operator on the Gaussian filter first and then apply the Derivative of Gaussian (DoG) filter on the original image. I expect the result of the gradient magnitude and edge image to be the same as the previous result.

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/dog_dx.png "X Derivative of Gaussian")
![Image 2 Description](/assets/images/iustino.com/image_blending/dog_dy.png "Y Derivative of Gaussian")
</image-grid>

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/convolve_dog_dx.png "X DoG on Original")
![Image 2 Description](/assets/images/iustino.com/image_blending/convolve_dog_dy.png "Y DoG on Original")
</image-grid>

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/grad_mag_dog.png "Gradient magnitude (DoG)")
![Image 2 Description](/assets/images/iustino.com/image_blending/edge_dog.png "Edge (DoG)")
</image-grid>

<!-- They look the same - With one caveat. *TODO* -->

Now let's explore the frequency domain of the images.

The first thing that I want to try out is to sharpen an image. I will be using the unsharp masking technique. The details of the images, like edges and patterns, tend to be high frequency components. By attenuating the high frequency components, we can make the edges and details pop.

So how do we get the frequency components of an image? Recall Gaussian filter is a low pass filter that retains only the low frequency components. Therefore, we can subtract the output of a Gaussian filtered image from the original image to get the high frequency components.

$$
I_h(x,y) = I(x,y) - I_l(x,y)
$$

We will be using the Taj Mahal image for this example.


<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/unsharpened_taj.png "Original Taj")
![Image 2 Description](/assets/images/iustino.com/image_blending/low_passed_taj.png "Low Passed Taj")
![Image 3 Description](/assets/images/iustino.com/image_blending/high_passed_taj.png "High Passed Taj")
</image-grid>

Now we can add the high frequency components back to the original image to get a sharpened image.

$$
I_s(x,y) = I(x,y) + I_h(x,y)
$$

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/unsharpened_taj.png "Original Taj")
![Image 2 Description](/assets/images/iustino.com/image_blending/sharpened_taj.png "Sharpened Taj")
</image-grid>

Nice!

The operations above 

I think we just made a mini version of Lightroom's sharpening tool.

Here is the same operation applied to a different image.

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/unsharpened_norway.png "Original Image of Norway")
![Image 2 Description](/assets/images/iustino.com/image_blending/low_passed_norway.png "After Applying Gaussian Filter")
</image-grid>

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/high_passed_norway.png "Subtracting the low passed image from the original")
![Image 2 Description](/assets/images/iustino.com/image_blending/sharpened_norway.png "Adding the high passed image to the original")
</image-grid>

The same technique can also be used to restore a blurry image. Below is an image I took at Seattle, but was unfocused.

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/low_passed_restaurant.png "Unfocused Image")
![Image 1 Description](/assets/images/iustino.com/image_blending/high_passed_restaurant.png "High frequency components")
![Image 1 Description](/assets/images/iustino.com/image_blending/sharpened_restaurant.png "Focused Image")
</image-grid>

What else can we do with frequency domain processing? In a SIGGRAPH 2006 paper by Olivia, Torralba, and Schyns, they were able to create a hybrid image that appears to show the face of one person during one viewing condition, but reveals another face when viewed from another angle. Hybrid images are static images that change in interpretation as a function of viewing distance. Fun fact: Salvador Dali used this technique heavily in his painting *Gala Contemplating the Mediterranean Sea* and *Lincoln in Dalivision*. A more famous example is Da Vinci's *Mona Lisa*.

The basic idea is that high frequency tends to dominate perception when available, but at a distance, only low frequency components are perceived. Therefore by layering a high frequency image on top of a low frequency image, we can create a hybrid image that appears one way at a distance and another way up close.

Below we have a image of professor Derek Hoiem and Nutmeg the cat.

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/DerekPicture.jpg "Derek")
![Image 1 Description](/assets/images/iustino.com/image_blending/nutmeg.jpg "Derek's former cat, Nutmeg")
</image-grid>

We get the low frequency components of professor Hoiem by applying a Gaussian filter to it, and the high frequency components of Nutmeg by subtracting the low frequency components from the original image.

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/hybrid_image_output.png "Derek and Nutmeg")
</image-grid>

Here is me and my friend, Stephen.

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/me.jpg "JWU")
![Image 1 Description](/assets/images/iustino.com/image_blending/stephy.jpg "Stephen")
![Image 1 Description](/assets/images/iustino.com/image_blending/hybrid_me.jpg "Stephen and JWU")
</image-grid>

Some B&W photos taken at Seattle (also in my *Seattle Lines* photo album):

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/DSC01499.jpg "Stephen")
![Image 1 Description](/assets/images/iustino.com/image_blending/DSC01568.jpg "Stephen and I")
![Image 1 Description](/assets/images/iustino.com/image_blending/hybrid_image_output_seattle.png "Stephen and I")
</image-grid>

I performed a frequency analysis on the input images and the blended output to see how the image frequencies changed as we morphed and blended them.

Here are the frequency of the original images:
<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/fft_jwu_input.png "JWU (Frequency)")
![Image 1 Description](/assets/images/iustino.com/image_blending/fft_stephy_input.png "Stephen (Frequency)")
</image-grid>

The frequency representation of the extracted frequency components

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/fft_jwu_low_freq.png "JWU (Low Frequency)")
![Image 1 Description](/assets/images/iustino.com/image_blending/fft_stephy_high_freq.png "Stephen (High Frequency)")
![Image 1 Description](/assets/images/iustino.com/image_blending/fft_hybrid.png "Hybrid")
</image-grid>


Here is a failed attempt:

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/deadmau1.jpg "Deadmau5 and Orange")
![Image 1 Description](/assets/images/iustino.com/image_blending/orange.jpeg "Deadmau5 and Orange")
![Image 1 Description](/assets/images/iustino.com/image_blending/failure.png "Deadmau5 and Orange")
</image-grid>

The high frequency components are too strong and thus dominate the low frequency components. To get the cleanest high frequency components, it is best to use image with good subject and background isolation.

Going one step further into the frequency domain, we can blend two images together with a **image spline**, which is a smooth seam between two images created with gentle distortion. The technique used to create this seam is called **multi-resolution blending**, which invovles deconstructing the two images into frequency bands, blending them at each band with a weighted mask, and then recomposing the image by merging the frequency bands back together.

We are given two images. Say we want to blend them with a vertical seam in the middle. We can define a mask that is white (1) on the left half and (0) on the right half. In the mask, white areas represent where image A would dominate, black areas represent where image B would dominate.

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/apple.jpeg "Apple")
![Image 1 Description](/assets/images/iustino.com/image_blending/orange.jpeg "Orange")
![Image 1 Description](/assets/images/iustino.com/image_blending/oraple_mask.png "Mask")
</image-grid>

If we were to simply blend the images together as is, we will get an abrupt and noticeable seam in the middle. Instead, we can deconstruct the image into different frequency bands, represented by Laplacian stacks.

So how do we get the Laplacian Stacks? Recall that Laplacian stack contains a specific frequency band and that band only. To get the bands, we can iteratively apply a Gaussian filter to the original at varying levels, getting a **Gaussian Stack**. We can then subtract each level of the Gaussian filter from the previous level to get the specific frequency band.

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/apple_gaussian_stack.png "Gaussian Stack of Apple")
</image-grid>

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/orange_gaussian_stack.png "Gaussian Stack of Orange")
</image-grid>

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/apple_laplacian_stack.png "Laplacian Stack of Apple")
</image-grid>

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/orange_laplacian_stack.png "Laplacian Stack of Orange")
</image-grid>

We can then blend each frequency band with a Gaussian stack:

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/album_mask_gaussian.png "Gaussian Stack of Masks")
</image-grid>

And get the Laplacian Stack of the blended image:

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/oraple_laplacian_stack.png "Laplacian Stack of Blended Image")
</image-grid>

The last image in the blended Laplacian Stack is the result of "collapsing" the Laplacian Stack back to an image, meaning we add the frequency bands of the blended image back together.

Here is a look at the final result.

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/oraple.png "Oraple")
</image-grid>

The Gaussian Mask stack is essentially weights that determine how much each frequency band of the image contributes to the final result. For the highest frequency bands, the least blurred mask is used to ensure that the blending for sharp features (like edges of the fruits) follow the mask closely. As we move towards the lower frequency bands, the masks become more blurred to blend the image more smoothly.

Applying this technique to some other images:

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/album1.jpg "\"> album title goes here <\"")
![Image 1 Description](/assets/images/iustino.com/image_blending/album2.jpg "Another great album")
</image-grid>

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/album_1_laplacian.png "Fav album 1")
</image-grid>

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/album_2_laplacian.png "Fav album 2")
</image-grid>


<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/blended_album_laplacian.png "Fav album squared")
</image-grid>

Another example, where I used an irregular mask:

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/deadmau2.jpg "Quetzalcoatl")
![Image 1 Description](/assets/images/iustino.com/image_blending/deadmau1.jpg "Deadmau5")
</image-grid>

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/maya_deadmau5_laplacian.png "Quetzalcoatl (Laplacian)")
</image-grid>

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/laplacian_red_deadmau5.png "Deadmau5 (Laplacian)")
</image-grid>

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/edge_based_mask.png "Some RGB/GBR Conversion Issue")
</image-grid>

<image-grid>
![Image 1 Description](/assets/images/iustino.com/image_blending/blended_edge_based.png "Neat!")
</image-grid>

For the second example, I used edge based blending. I wrote a contour detection algorithm to detect the edge of the subject and created a mask by tracing the edges.

This project was a fun exploration into the frequency domain and into image processing techniques. It made me appreciate the math, physics, and cognition that underlies computer vision and image editing softwares like Lightroom.
