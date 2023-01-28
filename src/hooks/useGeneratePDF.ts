import * as htmlToImage from 'html-to-image'
import jsPDF from 'jspdf'
import { toast } from 'src/components/Widgets/Toastify'
import { useLoading } from './useLoading'

type TypeSaveMode = 'auto_download' | 'open_new_window'

export const useGeneratePDF = () => {
  const { Loading } = useLoading()

  const exportPDF = (
    filePDFName: string,
    idName: string,
    typeSaveMode: TypeSaveMode,
  ) => {
    try {
      Loading.turnOn()
      const input = document.getElementById(idName)

      // html2canvas(input, { scrollY: -window.scrollY }).then(function (canvas) {
      //   var img = canvas.toDataURL()
      //   window.open(img)
      // })

      htmlToImage
        .toCanvas(input)
        .then((canvas) => {
          const imgWidth = 208
          const imgHeight = (canvas.height * imgWidth) / canvas.width
          const imgData = canvas.toDataURL()
          const pdf = new jsPDF('portrait', 'mm', 'a4')
          pdf.setProperties({
            title: filePDFName,
          })
          pdf.addImage(
            imgData,
            'jpeg',
            0,
            0,
            imgWidth,
            imgHeight,
            // undefined,
            // 'FAST',
          )
          if (typeSaveMode === 'auto_download') {
            pdf.save(`${filePDFName}.pdf`)
          } else {
            pdf.autoPrint()
            window.open(
              pdf.output('bloburl'),
              '_blank',
              'height=650,width=500,scrollbars=yes,location=yes',
            )
          }
          // let element = document.createElement('a')
          // element.href = canvas.toDataURL('img/png')
          // element.download = `${filePDFName}.png`
          // element.click()
          //document.body.appendChild(canvas)
          Loading.turnOff()
        })
        .catch((error) => {
          toast.error(error)
          exportPDF(filePDFName, idName, typeSaveMode)
        })
    } catch (error) {
      toast.error(
        'Ops! Houve um erro ao tentar gerar o documento PDF, atualize a página e tente novamente.',
      )
      Loading.turnOff()
    }
  }
  return exportPDF
}
