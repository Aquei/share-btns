# share-btns
social share buttons

## 属性値
###`data-sites`
表示したいサイトの名前をカンマ区切りで、表示したい順番に
* twitter
* facebook
* hatena
* google
* line

例：`<share-btns data-sites="twitter, facebook,line"></share-btns>`


### `data-url`
ページのurl
例：`<share-btns data-sites="twitter" data-url="https://example.com/"></share-btns>`

指定されなかったら`head link[rel="canonical"]`の`href` これもなかったら`document.URL`

### demo ###
[demo](https://rawgit.com/Aquei/d251103a41f232035ff9/raw/8385ed97c188422d53b485b1f536ac1b4ed35318/share-btns.html)
