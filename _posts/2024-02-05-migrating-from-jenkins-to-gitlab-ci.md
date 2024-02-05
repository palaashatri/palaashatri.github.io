---
layout: post
title:  "Retrospection - Migrating from Jenkins to Gitlab CI"
date:   2024-02-05
---

Jenkins and Gitlab CI are like the two de-facto CI/CD automation tools that a lot of corporations use. Its mostly recommended to use Jenkins due to its ease-of-use, a large amount of plugins, and quite a lot of flexibility, but it requires you to deploy its WAR in a self-hosted instance, something which a lot of companies don't have the bandwidth for considering all the cost-cutting endeavours.

We also had to make the same call, due to cost-cutting exercises being taken company wide, we had to move all our team projects (about 50 of them), which consists of a Java SDK, a Python SDK, a Node SDK, a lot of docker images that we use as base images for our SDKs as well as some used for automation of Kubernetes deployment, validation tools etc. from Jenkins to Gitlab CI, since most of our code is also hosted on Gitlab SaaS.

It also kinda made sense to have all your code and automation in one place, and Gitlab does provide that out of the box. Management-wise, it was an easy migration. Developer-wise? Well...

Moving 50 projects sounds like something that should barely take a month, but when you take into consideration that a lot of automated tests are custom code, tailored to run on Jenkins runner itself, migrating them over to Gitlab CI, that too on a Kubernetes executor, which does not expose the local Docker daemon to run tests on majority of our Docker images, makes it a tedious endeavour.
But still, as developers and engineers, we are bound by our duty make stuff run. And we did.

I'll add some of the challenges we faced, but first let's see what our previous Jenkins architecture was:

- An EC2 instance
- Preloaded with Ubuntu Server 16.04
- Had Python 3.6, Node.js 16, Java 11 and Maven 3.5.0 as build tools, alongwith GCC (from `build-essentials` package) 
- Had Jenkins, Docker, and Docker-Compose installed
- Jenkins installation had plugins for Jfrog Artifactory, and Fortify SAST scan

Now our new Gitlab CI architecture is:

- Kubernetes executor, preinstalled with a barebones Ubuntu Server 16.04
- or we could use the Gitlab's pre-provided public SaaS runners

Gone in the dust were our build tools and Docker installations. This broke our pipelines.
