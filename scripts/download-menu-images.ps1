$ErrorActionPreference = "Continue"

$outputDirectory = Join-Path $PSScriptRoot "..\public\menu-images"
New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null

$images = @(
  @{ File = "trad-01-anticuchos.jpg"; Url = "https://www.ytuqueplanes.com/imagenes/fotos/novedades/anticucho-en-mesa.jpg" },
  @{ File = "trad-02-anticuchos.jpg"; Url = "https://lacasadelanticucho.weebly.com/uploads/1/3/8/4/13848090/5200861_orig.jpg" },
  @{ File = "trad-03-pancita.jpg"; Url = "https://www.machutravelperu.com/blog/wp-content/uploads/2018/06/rachi-street-food-824x463.jpg" },
  @{ File = "trad-04-rachi.jpg"; Url = "https://i.pinimg.com/originals/0d/04/2f/0d042fe652b909934cb90cd7198b9c06.jpg" },
  @{ File = "trad-05-molleja.jpg"; Url = "https://quebracho.com.mx/assets/img/cocina/03-mollejas.jpg" },
  @{ File = "mixto-06.jpg"; Url = "https://lacasadelanticucho.weebly.com/uploads/1/3/8/4/13848090/5200861_orig.jpg" },
  @{ File = "mixto-07.jpg"; Url = "https://www.ytuqueplanes.com/imagenes/fotos/novedades/anticucho-en-mesa.jpg" },
  @{ File = "mixto-08.jpg"; Url = "https://foodtourlima.com/wp-content/uploads/2023/05/rachi.jpg" },
  @{ File = "mixto-09.jpg"; Url = "https://www.lanacion.com.ar/resizer/v2/secretos-para-lograr-la-molleja-perfecta-en-tu-65N23KMOW5H57ERXLI6RMMLSFQ.jpeg?auth=27133fba54a880e8376b6fc55ef43a14c4f8c5959ed686cfddb1fba2fe0251f1&height=900&quality=70&smart=true&width=1200" },
  @{ File = "mixto-10.jpg"; Url = "https://quebracho.com.mx/assets/img/cocina/03-mollejas.jpg" },
  @{ File = "mixto-11.png"; Url = "https://media.lmneuquen.com/p/74c19e2b059a36610d11eae3cb144034/adjuntos/195/imagenes/007/785/0007785414/770x0/smart/mollejas-achuraswebp.png" },
  @{ File = "mixto-12.jpg"; Url = "https://img0.didiglobal.com/static/soda_public/img_907bf4d543338517b1b0e2fa1f7e4e87.jpg" },
  @{ File = "mixto-13.jpg"; Url = "https://s.libertaddigital.com/2024/07/26/taberna-triciclo-mollejas-2.jpeg" },
  @{ File = "mixto-14.jpg"; Url = "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/4L4DQX7FNNG3BIST7FAIUORSRQ.jpg" },
  @{ File = "mixto-15.jpg"; Url = "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/4L4DQX7FNNG3BIST7FAIUORSRQ.jpg" },
  @{ File = "mixto-16.jpg"; Url = "https://lacabanaargentina.es/wp-content/uploads/elementor/thumbs/mollejas-de-ternera-a-la-brasa-restaurante-la-cabana-argentina-qmfu0i01xri2p3sc67d9b4y17p3gcqwrjdj5khxfg0.jpg" },
  @{ File = "mixto-17.jpg"; Url = "https://anticuchos-bran.mozello.shop/files/2113861/catitems/Captura_de_pantalla_2023-11-01_143120-fbac27398b85f5b135a8eea4c13c09e6.jpg" },
  @{ File = "parrilla-18-alitas.jpg"; Url = "https://img-global.cpcdn.com/steps/9fec4e62a3235700/400x400cq80/photo.jpg" },
  @{ File = "parrilla-19-pierna.webp"; Url = "https://www.master-poulet.fr/_next/image?dpl=dpl_EGXPARDErnZjTsVqxycbvUzKd3ms&q=75&url=%2F_next%2Fstatic%2Fmedia%2Fun-pilon.41e4207c.webp&w=3840" },
  @{ File = "parrilla-20-entrepierna.jpg"; Url = "https://imageproxy.wolt.com/menu/menu-images/68429bc2ef5a1e6a2827e91f/8e9316ca-42e1-11f0-bea3-962a2557d275_483_hsam8_1.jpg" },
  @{ File = "parrilla-21-pechuga.jpg"; Url = "https://tb-static.uber.com/prod/image-proc/processed_images/67c976917b4432d5f8d9373333a95719/f0d1762b91fd823a1aa9bd0dab5c648d.jpeg" },
  @{ File = "parrilla-22-chuleta.jpg"; Url = "https://www.henssler.shop/cdn/shop/articles/20240623202150-mariniertes_schweinekotelett_vom_grill_henssler_schnelle_nummer.jpg?v=1722330773&width=3840" },
  @{ File = "especial-23.png"; Url = "https://a0.pikist.com/pngimg/1662/1162/kabab-koobideh-tabbouleh-kebab-of-adana-shish-taouk-souvlaki-shashlik-brochette-grilled-food-turkish-food-french-cuisine.png" },
  @{ File = "especial-24.jpg"; Url = "https://qul.imgix.net/e257b838-c2d2-4b85-98c2-089a1e748882/586438_sld.jpg" },
  @{ File = "especial-25.jpg"; Url = "https://www.artspace.by/images/2024/10/08/01.jpg" },
  @{ File = "especial-26.jpg"; Url = "https://www.artspace.by/images/2024/10/08/01.jpg" },
  @{ File = "adicional-anticucho.jpg"; Url = "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/4L4DQX7FNNG3BIST7FAIUORSRQ.jpg" },
  @{ File = "adicional-pancita.jpg"; Url = "https://anticuchos-bran.mozello.shop/files/2113861/catitems/Captura_de_pantalla_2023-11-01_143120-fbac27398b85f5b135a8eea4c13c09e6.jpg" },
  @{ File = "adicional-rachi.jpg"; Url = "https://foodtourlima.com/wp-content/uploads/2023/05/rachi.jpg" },
  @{ File = "adicional-molleja.jpg"; Url = "https://s.libertaddigital.com/2024/07/26/taberna-triciclo-mollejas-2.jpeg" },
  @{ File = "adicional-arroz.jpg"; Url = "https://flayvr.co.uk/cdn/shop/files/vecteezy_cooked-rice-on-a-white-plate-jasmine-rice_3466575.jpg?v=1747991787" },
  @{ File = "adicional-papas.jpg"; Url = "https://imageproxy.wolt.com/menu/menu-images/5fafb7501487a74d7eabaa6d/d129ff8e-460f-11ed-b77e-a6f8ab31fcef_su_ltkrumpli_11_.jpeg?w=1600" },
  @{ File = "adicional-ensalada.jpg"; Url = "https://assets.bonappetit.com/photos/59c2883873983b05a8812ae8/1:1/w_4790,h_4790,c_limit/170629-HT-Dress-Salad-603.jpg" },
  @{ File = "adicional-choclo.jpg"; Url = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Boiled%20corn%20on%20a%20white%20plate.jpg?width=1200" },
  @{ File = "bebida-chicha.jpg"; Url = "https://menu.tipsipro.com/media/uploads/ChichaMorada.jpg" },
  @{ File = "bebida-maracuya.webp"; Url = "https://ss-cnt-001c.esmsv.com/r/content/host2/e792b21306388e1abdab9faf79b32345/img/products/37.webp" },
  @{ File = "bebida-gaseosa-personal.jpg"; Url = "https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=82&w=1200" },
  @{ File = "bebida-gordita.jpg"; Url = "https://media02.stockfood.com/previews/NzA3OTY0/00058997.jpg" },
  @{ File = "bebida-gaseosa-15l.jpg"; Url = "https://hablacausa.com.pe/wp-content/uploads/2025/03/gaseosa-coca-colaaaa.jpg" },
  @{ File = "bebida-gaseosa-1l.jpg"; Url = "https://oechsle.vteximg.com.br/arquivos/ids/1352275-1000-1000/image-0ca1c72e498747f086ad9541ff3c56b0.jpg?v=637494732303400000" },
  @{ File = "bebida-chicha-half.webp"; Url = "https://tofuu.getjusto.com/orioneat-local/resized2/o9psDaWLoN5TFweJx-2400-x.webp" },
  @{ File = "bebida-cerveza.jpg"; Url = "https://img.magnific.com/free-photo/front-view-bottle-bear-with-glass-full-bear-light-background_140725-94845.jpg?q=80&w=1200" },
  @{ File = "bebida-infusion.jpg"; Url = "https://images.squarespace-cdn.com/content/v1/65da054413203309c20d9a9a/1710674776306-ZUNMYI85JXXMT511B934/image-asset.jpeg" }
)

$failed = @()
foreach ($image in $images) {
  $destination = Join-Path $outputDirectory $image.File
  if ((Test-Path -LiteralPath $destination) -and (Get-Item -LiteralPath $destination).Length -ge 1000) {
    Write-Output "SKIP $($image.File)"
    continue
  }
  & curl.exe -L --fail --silent --show-error --max-time 45 --retry 2 --user-agent "Mozilla/5.0" --output $destination $image.Url
  if ($LASTEXITCODE -ne 0 -or -not (Test-Path -LiteralPath $destination) -or (Get-Item -LiteralPath $destination).Length -lt 1000) {
    $failed += $image.File
    Remove-Item -LiteralPath $destination -ErrorAction SilentlyContinue
    Write-Warning "No se pudo descargar $($image.File)"
  } else {
    Write-Output "OK $($image.File)"
  }
}

if ($failed.Count -gt 0) {
  Write-Error "Descargas fallidas: $($failed -join ', ')"
  exit 1
}

Write-Output "Descargadas $($images.Count) imágenes."
