---
title: "Skip ad for youtube"
disqus: hackmd
---

# Skip ad for youtube

## Table of Contents

[TOC]

## Introduction

我很喜歡看 youtube 影片，一開始雖然有廣告，但是五秒就能跳過。但最近越來越誇張，廣告我竟然有看到 30 秒的廣告，不想花錢的我，開始想要怎麼才能跳過廣告。

I am a big fan of watching YouTube videos. Initially, even though there were ads, I could skip them after five seconds. However, lately, the ads have become more and more excessive, with some lasting as long as 30 seconds. As someone who doesn't want to spend money, I am now considering how to bypass these ads.

而最近我發現一個好東西，就是 youtube embed。他原來的功能是讓其他網頁可以引用 youtube 的影片，因此裡面不會有廣告。因此我就想辦法用 google extension 來插入一個 youtube embed 在看 youtube 的時候。

Recently, I found out about a great feature called YouTube embed. Its original purpose was to allow other websites to embed YouTube videos, thus eliminating the need for ads. So, I figured out a way to use a Google extension to insert a YouTube embed when watching videos on YouTube.

當然有些影片不能用 youtube embed 觀看，但依我這樣看下來，這個狀況真的極少。

Of course, some videos cannot be watched with YouTube embed, but in my experience, this is a very rare occurrence.

## Version1

一開始我的對 google extension 還沒那麼熟悉，因此我只在 popup 也就是網頁右上角的工具列那裡寫一個簡單的功能，就是我給它一個網址，它會幫我將該影片的 youtube embed 呈現在下面。

Initially, I wasn't very proficient with Google extensions. So, I wrote a simple function in the popup, which is the toolbar located in the upper-right corner of the web page. The function allows me to input a URL, and it will then display the YouTube embed of the corresponding video below.

## Version2

我比較熟悉 google extension 之後，我將其作成會在網頁旁邊增加一個懸浮的視窗，**_然後只要拖移 youtube 中的影片，也就是按住往旁邊拉一點點，它就會將其導入 youtube embed 中，或者直接點進去影片裏面也可以_**。

After I became more familiar with Google extensions, I created one that adds a floating window next to the web page. **_All you have to do is drag the video from YouTube, or simply click into the video, and it will lead to the YouTube embed_**.

![](https://i.imgur.com/6SUCpYX.jpg)

然後因為我看影片喜歡兩倍速，因此我增加倍速的功能，可以調整倍速 1~10 倍。**_預設是兩倍速度_**。然後也做了個 enable 按鍵，可以將 youtube embed 關掉。

And because I like watching videos at double speed, I added a speed adjustment feature that can be adjusted from 1 to 10 times. **_The default is double speed_**. And I also made an enable button that can turn off the youtube embed.

![](https://i.imgur.com/TaXq3jh.png)

## Update

增加了改變 youtube embed 大小和位置的功能。

Add the ability to change the size and position of the YouTube embed.

![](https://i.imgur.com/s1TbhEO.png)

> > 但途中有一個小問題，也就是當影片大的特定大小的時候，會有特殊狀況，就是當影片同時畫面中也有 youtube 本身的影片在撥放(首頁的預覽或者是，點進去影片之後)，為了解決這個所以**_我將 youtube 的影片本身的影片拔掉了_**。
> >
> > However, there was a minor issue where when the video was at a specific size, there was a special situation where there was both the youtube embed video and the actual youtube video playing simultaneously (for example, in the video preview or when you click into the video). To resolve this issue, **_I removed the youtube video from the screen_**.
> > ![](https://i.imgur.com/MlDFuxj.png)
