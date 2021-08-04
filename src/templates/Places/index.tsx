import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline'
import LinkWrapper from 'components/LinkWrapper'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import * as S from './styles'

type ImageProps = {
  url: string
  height: number
  width: number
}

export type PlacesTemplateProps = {
  place: {
    slug: string
    name: string
    description: {
      html: string
    }
    gallery: ImageProps[]
  }
}

export default function PlacesTemplate({ place }: PlacesTemplateProps) {
  const router = useRouter()

  if (router.isFallback) return null

  return (
    <>
      <LinkWrapper href="/">
        <CloseOutline size={32} aria-label="Go back to map" />
      </LinkWrapper>

      <S.Wrapper>
        <S.Container>
          <S.Heading>{place.name}</S.Heading>

          <S.Body
            dangerouslySetInnerHTML={{ __html: place.description?.html || '' }}
          />

          <S.Gallery>
            {place.gallery.map((image, index) => (
              <>
                <Image
                  key={`photo-${index}`}
                  src={image.url}
                  alt={place.name}
                  width={image.width}
                  height={image.height}
                  quality={75}
                />
                <S.Caption>
                  <>
                    Você pode ver mais fotos minhas no{' '}
                    <a href="https://unsplash.com/@willianjusten">Unsplash</a>
                  </>
                </S.Caption>
              </>
            ))}
          </S.Gallery>
        </S.Container>
      </S.Wrapper>
    </>
  )
}
