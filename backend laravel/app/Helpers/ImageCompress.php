<?php

namespace App\Helpers;

class ImageCompress {
    public static function compressImage($source, $quality) {

        $info = getimagesize($source);

        if ($info['mime'] == 'image/jpeg') 
            $image = imagecreatefromjpeg($source);

        elseif ($info['mime'] == 'image/gif') 
            $image = imagecreatefromgif($source);

        elseif ($info['mime'] == 'image/png') 
            $image = imagecreatefrompng($source);

        imagewebp($image, $source,  $quality);

        // imagejpeg($image, $source,  $quality);
    }
}