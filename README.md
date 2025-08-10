---
title: "Skip ad for youtube"
disqus: hackmd
---

# Skip ad for youtube

## Table of Contents

[TOC]

## Introduction

我很喜歡看 youtube 影片，一開始雖然有廣告，但是五秒就能跳過。但最近越來越誇張，廣告我竟然有看到 30 秒的廣告，不想花錢的我，開始想要怎麼才能跳過廣告。

I enjoy watching YouTube videos, but the new 'skip ads' policy can be frustrating since some advertisements last up to 30 seconds. As someone who doesn't want to spend money just to skip ads, I start thinking about how to avoid the ads showing up.

而最近我發現一個好東西，就是 youtube embed。他原來的功能是讓其他網頁可以引用 youtube 的影片，因此裡面不會有廣告。因此我就想辦法用 google extension 來插入一個 youtube embed 在看 youtube 的時候。

Recently, I found the ‘YouTube embed’ feature, which allows other websites to embed YouTube videos without ads. Therefore, I figured out a way to use a Google extension to insert a YouTube embed when watching videos on YouTube.

當然有些影片不能用 youtube embed 觀看，但依我這樣看下來，這個狀況真的極少。

While there are some videos that cannot be watched with the YouTube embed, this is a rare occurrence in my experience.

## Version1

一開始我的對 google extension 還沒那麼熟悉，因此我只在 popup 也就是網頁右上角的工具列那裡寫一個簡單的功能，就是我給它一個網址，它會幫我將該影片的 youtube embed 呈現在下面。

Initially, I wasn't very familiar with Google extensions, so I wrote a simple function in the popup toolbar located in the upper-right corner of the web page. This function allows me to input a URL and display the YouTube embed of the specific video below.

## Version2

我比較熟悉 google extension 之後，我將其作成會在網頁旁邊增加一個懸浮的視窗，**_然後只要拖移 youtube 中的影片，也就是按住往旁邊拉一點點，它就會將其導入 youtube embed 中，或者直接點進去影片裏面也可以_**。

After I became more proficient with Google extensions, I created one that adds a floating window next to the web page. To use this feature, **_all you have to do is drag the video from YouTube, or simply click on it, and it will lead to the YouTube embed_**.

![](https://i.imgur.com/6SUCpYX.jpg)

然後因為我看影片喜歡兩倍速，因此我增加倍速的功能，可以調整倍速 1~10 倍。**_預設是兩倍速度_**。然後也做了個 enable 按鍵，可以將 youtube embed 關掉。

Because I like watching videos at double speed, I added a speed adjustment feature that allows me to watch videos at double speed or adjust the speed from 1 to 10 times. There is also an enable button that turns off the YouTube embed.**_The default is double speed_**.

![](https://i.imgur.com/TaXq3jh.png)

## Update

增加了改變 youtube embed 大小和位置的功能。

To further customize my viewing experience, I added a function to change the size and position of the YouTube embed.

![](https://i.imgur.com/s1TbhEO.png)

> > 但途中有一個小問題，也就是當影片大的特定大小的時候，會有特殊狀況，就是當影片同時畫面中也有 youtube 本身的影片在撥放(首頁的預覽或者是，點進去影片之後)，為了解決這個所以**_我將 youtube 的影片本身的影片拔掉了_**。

> > However, I encountered a minor issue where both the YouTube embed video and the actual YouTube video played simultaneously in some cases (such as in the video preview on the main page or when clicking on the video). To solve this issue, **_I removed the youtube video from the screen_**.

> > ![](https://i.imgur.com/MlDFuxj.png)

## Version3

整體上和 version2 的概念是一樣的。
但是因為常常開 popup 頁面很煩，所以我將調整大小，挑整位置，調整速度改到 iframe 上面，也就是主頁面上，如下圖。

Overall, the concept remains the same as version 2. However, to avoid the inconvenience of opening a popup page, I have relocated the resizing, repositioning, and speed adjustment features to the top of the iframe on the main page. Please refer to the attached image for a visual representation of this.

![](https://i.imgur.com/lIndWkG.png)

按住按鈕並滑動就可以調整大小和位置。

By pressing and sliding the button, you can adjust the size and position.

而 popup 頁面就剩兩個功能就是 enable 和 reset。enable 按鈕按下去就會將 iframe 隱藏。reset 按鈕按下去則會將 iframe 設置回原本的大小及位置。

The popup page has only two functions: enable and reset. Clicking on the enable button will hide the iframe. Clicking on the reset button will restore the iframe to its original size and position.
![](https://i.imgur.com/x5GDg6Q.png)


## 2025 更新：改用 Proxy 方式嵌入

- 為什麼：在 `www.youtube.com` 直接嵌入 YouTube（`youtube.com/embed`）越來越容易被官方阻擋。為了避免被擋，現在改為透過「獨立來源」的 proxy 頁面載入，並用查詢參數傳遞影片 ID。
- 變更內容：
  - 不再導向 `https://www.youtube.com/embed/{videoId}`，而是導向 proxy，如：`https://your-host.tld/?v={videoId}`。
  - proxy 頁面會在自己的網域中嵌入 YouTube no-cookie 播放器並播放該影片。
- 目前部署：使用 GitHub Pages 提供 proxy 頁面：[GitHub Pages 部署](https://ian0336.github.io/adSkipperForYoutube-chrome_extention)。
- 自行部署：可部署到任意靜態主機（GitHub Pages、Vercel、Netlify、Cloudflare Pages、自架伺服器）。需求如下：
  - 在站點根路徑提供 `index.html`，支援 `?v={videoId}` 並在頁面內嵌入 YouTube 播放器。
  - 可選參數：`start` 或 `t`（秒數）。
  - 範例 URL：`https://your-domain.tld/?v=dQw4w9WgXcQ`。
- 設定 base URL：
  - 前往 `version3/content.js`，將目前使用的 proxy 網域（例如 `ian0336.github.io/adSkipperForYoutube-chrome_extention`）改成你自己的主機。
  - 程式預期 proxy 在「站點根路徑」接受 `?v={videoId}`。