// Scalate template engine config for Xitrum
// "import" must be at top of build.sbt, or SBT will complain
import ScalateKeys._

// Precompile Scalate
seq(scalateSettings:_*)

scalateTemplateConfig in Compile := Seq(TemplateConfig(
  file("src") / "main" / "scalate",
  Seq(),
  Seq(Binding("helper", "xitrum.Action", true))
))

libraryDependencies += "tv.cntt" %% "xitrum-scalate" % "1.6"

//------------------------------------------------------------------------------

organization := "tv.cntt"

name         := "xitrum-new"

version      := "1.0-SNAPSHOT"

scalaVersion := "2.10.3"

scalacOptions ++= Seq("-deprecation", "-feature", "-unchecked")

// Most Scala projects are published to Sonatype, but Sonatype is not default
// and it takes several hours to sync from Sonatype to Maven Central
resolvers += "SonatypeReleases" at "http://oss.sonatype.org/content/repositories/releases/"

libraryDependencies += "tv.cntt" %% "xitrum" % "3.2"

// Xitrum uses SLF4J, an implementation of SLF4J is needed
libraryDependencies += "ch.qos.logback" % "logback-classic" % "1.1.1"

// xgettext i18n translation key string extractor is a compiler plugin ---------

autoCompilerPlugins := true

addCompilerPlugin("tv.cntt" %% "xgettext" % "1.0")

scalacOptions += "-P:xgettext:xitrum.I18n"

// xitrum.imperatively uses Scala continuation, also a compiler plugin ---------

libraryDependencies <+= scalaVersion { sv =>
  compilerPlugin("org.scala-lang.plugins" % "continuations" % sv)
}

libraryDependencies ++= List(
  // use the right Slick version here:
  "com.typesafe.slick" %% "slick" % "1.0.0",
  "com.typesafe" % "slick_2.10.0-RC5" % "0.11.2",
  "org.slf4j" % "slf4j-nop" % "1.6.4",
  "com.h2database" % "h2" % "1.3.166",
  "org.jumpmind.symmetric.jdbc" % "mariadb-java-client" % "1.1.1",
  "org.scalaquery" % "scalaquery_2.9.0-1" % "0.10.0-M1",
  "joda-time" % "joda-time" % "2.3",
  "org.joda" % "joda-convert" % "1.5",
  "org.openid4java" % "openid4java" % "0.9.8",
  "javax.servlet" % "javax.servlet-api" % "3.0.1",
  "com.google.gdata" % "core" % "1.47.1",
  "com.stackmob" % "stackmob-java-client-sdk" % "0.1.5",
  "net.databinder.dispatch" %% "dispatch-core" % "0.11.0",
  "com.ning" % "async-http-client" % "1.7.19",
  "com.google.visualization" % "visualization-datasource" %"1.1.1"
)

scalacOptions += "-P:continuations:enable"

// Put config directory in classpath for easier development --------------------

// For "sbt console"
unmanagedClasspath in Compile <+= (baseDirectory) map { bd => Attributed.blank(bd / "config") }

// For "sbt run"
unmanagedClasspath in Runtime <+= (baseDirectory) map { bd => Attributed.blank(bd / "config") }

// Copy these to target/xitrum when sbt xitrum-package is run
XitrumPackage.copy("config", "public", "script")
