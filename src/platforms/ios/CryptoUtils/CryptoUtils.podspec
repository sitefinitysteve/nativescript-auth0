
Pod::Spec.new do |s|
  s.name         = "CryptoUtils"
  s.version      = "1.0.0"
  s.summary      = "Crypto Utils Data Compression and Crypto utilities"
  s.authors      = "Tomé Vardasca"
  s.homepage     = "https://github.com/tomvardasca/nativescript-crypto"
  s.license      = { :type => 'Apache 2.0', :file => 'LICENSE' }
  s.source       = { :git => "https://github.com/tomvardasca/nativescript-crypto.git", :tag => s.version }

  s.ios.deployment_target = '9.0'
  s.osx.deployment_target = '10.11'
  s.tvos.deployment_target = '9.0'
  s.watchos.deployment_target = '2.0'

  s.pod_target_xcconfig = { 'SWIFT_VERSION' => '3.2' }
  s.source_files = '*.swift'
  s.requires_arc = true
end
