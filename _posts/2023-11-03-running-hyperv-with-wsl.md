---
layout: post
title:  "Running Hyper-V with WSL, on Windows 11 Home"
date:   2023-11-03 23:55:00 +0530
categories: windows hyper-v linux virtualization hypervisor virtualbox docker kubernetes wsl 
---

#### A small introduction

I'm a Windows user, first and foremost. Mostly by choice and convenience, because it came preinstalled with my beast of a laptop, and my laptop just sucks at supporting Linux (more on that, sometime later I guess). But, I cannot underestimate the power, and the occassional convenience of using Linux in a software developer's world.

The Windows Developer Experience for non-.NET developers is improving, but it still isn't the best. So there always comes a time where I would prefer running a Linux VM, while having Docker running in the background, natively, on my machine. Something, that Linux provides out-of-the-box with zero restrictions on consumer hardware, where you can run a KVM powered (i.e. hardware-accelerated) Linux virtual machine, with its own subset of Docker (or even Kubernetes), alongwith an instance of Docker running on your own machine.

It especially comes under play when you want to run simulated workflow of different blockchain clients connecting to the main chain/infrastructure, where every VM can function as its own client, while the main chain (server?) runs on your own machine.

Now you'd say, "Hey Palaash, stop talking out of your ass. We can run Docker and a VM in VirtualBox completely fine", well, VirtualBox is only hardware-accelerated when your Hyper-V backend built in Windows is not already busy, unfortunately, which it will be when Docker is running on your Windows machine, because Docker uses Hyper-V as its backend when running on Windows.

VirtualBox (and almost all other type-2 hypervisors) will default to a software mode when running without Hyper-V, which will totally finish up all your RAM and CPU in an instant, especially as soon as you boot up another new client. Try running two Ubuntu instances back to back on a Docker-enabled Windows system, you'll see.

Now, the MUCH better way is to run Linux, and then KVM to handle Docker, and all your VMs, but as I said before, I don't use Linux. I am a Windows 11 Home user.

The problem with this is, Hyper-V isn't bundled with Windows 11 Home. Its a "Pro" feature, that requires you to shell out another $100 for a license key. As an Indian, I naturally won't do that. Why pay more for stuff you can get for free?

Now you'd say "Hey Palaash, don't be a pirate!", but naw mate, I will not be sailing for seven seas. I will use a totally safe, legal script, using Microsoft's own built in tools, to install Hyper-V on Windows 11 Home, spin an Ubuntu VM, and use it in conjunction with Docker Desktop, ALL FOR FREE!

#### So, how do we progress?

Grab a cup of tea (or beer if that's more your choice), and follow the next few steps:

- On your desktop, create a file and call it "`enable-hyperv.bat`".
- Open this file in Notepad (++ would be better) and add the following lines of code.

```bat
pushd "%~dp0"
dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hyper-v.txt
for /f %%i in ('findstr /i . hyper-v.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"
del hyper-v.txt
Dism /online /enable-feature /featurename:Microsoft-Hyper-V -All /LimitAccess /ALL
pause
```

- Use Shift + Right-Click on the desktop, and open PowerShell
- Once PowerShell opens, type : `Start-Process cmd.exe -Verb runAs`
- Navigate to your Desktop directory and run the file. `Desktop` should generally be at `%USERPROFILE%\Desktop`, so you can safely run:

```bat
CD  %USERPROFILE%/Desktop
"enable-hyperv.bat"
```

> If you have OneDrive enabled for Desktop, `Desktop` will be at `%USERPROFILE%\OneDrive\Desktop`. Substitute the value accordingly.

- Wait for the script to execute, and once it executes and closes, restart your computer. You'll get an "Installing Updates..." message from Windows.
- Once it reboots, check application list for Hyper-V. If it is present, then voila, you have installed Hyper-V on Windows Home!

#### Why this works?

So, if you noticed in the script above, it is using Hyper-V packages found in  `%SystemRoot%\servicing\Packages`. All versions of Windows, whatever be their "tier", almost always bundle the same set of features. The features are enabled if some certain OS flag (which I don't really know, but will probably learn in the future) is set as `"true"`, which enables that feature.

What we are doing up there, is basically finding that package, and forcing the DISM (which stands for [Deployment Image Servicing and Management](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/what-is-dism?view=windows-11)) tool to install that specific package.

Its perfectly legal to patch/modify Windows using tools bundled with Windows, to use tools bundled with Windows, iykwim. Here we used the Windows DISM tool, to patch Windows to install and use Microsoft Hyper-V, on an OS where it wouldn't be supported otherwise with a subscription.

Do note, **that if something breaks** (which it mostly shouldn't), Microsoft wouldn't be responsible, and its **YOUR** mistake.

But, its still easier than to remove all of your existing Windows installation to install and use a [good Linux distribution](https://www.fedoraproject.org/) for getting to the same objective, and cheaper than buying a Windows 11 Pro license.